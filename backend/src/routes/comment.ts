import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import axios from "axios";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
export const commentRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();
//   Middleware
commentRouter.use(async (c, next) => {
  try {
    const jwt = c.req.header("Authorization");
    if (!jwt) {
      c.status(401);
      return c.json({ error: "Unauthorized" });
    }
    const token = jwt.split(" ")[1]; // Corrected token split
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
      c.status(401);
      return c.json({ error: "Unauthorized" });
    }
    c.set("userId", payload.id);
    await next();
  } catch (error) {
    console.error("Error verifying JWT token:", error);
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }
});
//   Route to create comment
commentRouter.post("/:postId", async (c) => {
  try {
    const userId = c.get("userId");
    const postId = c.req.param("postId");
    const publishedDate = new Date(); // Get the current date and time
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    // Parse request body
    const body = await c.req.json();
    const comment = await prisma.comment.create({
      data: {
        content: body.content,
        postId: postId,
        userId,
        //prima will automatically handle date part
      },
    });
    return c.json({ comment });
  } catch (error) {
    console.error("Error creating comment:", error);
    c.status(500); // Internal Server Error
    return c.json({ error: "Internal server error" });
  }
});
// to update the comment
commentRouter.put("/:id", async (c) => {
  try {
    const userId = c.get("userId");
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const commentId = c.req.param("id");
    // check if user is owner of comment
    const existingComment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!existingComment || existingComment.userId !== userId) {
      c.status(401);
      return c.json({ error: "Unauthorized" });
    }
    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: body.content,
      },
    });
    return c.json({ comment: updatedComment });
  } catch (error) {
    console.error("Error updating comment:", error);
    c.status(500); // Internal Server Error
    return c.json({ error: "Internal server error" });
  }
});
