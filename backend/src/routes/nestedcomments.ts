import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import axios from "axios";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
export const nestedCommentRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();
// middleware
nestedCommentRouter.use(async (c, next) => {
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
// Nested Comment routes
nestedCommentRouter.post("/:commentId", async (c) => {
  try {
    const userId = c.get("userId");
    const commentId = c.req.param("commentId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Parse request body
    const body = await c.req.json();

    // Create the nested comment
    const nestedComment = await prisma.comment.create({
      data: {
        content: body.content,
        postId: body.postId,
        userId,
        parentId: commentId, // Set the parent comment ID
      },
    });

    return c.json({ nestedComment });
  } catch (error) {
    console.error("Error creating nested comment:", error);
    c.status(500); // Internal Server Error
    return c.json({ error: "Internal server error" });
  }
});

nestedCommentRouter.put("/:commentId", async (c) => {
  try {
    const userId = c.get("userId");
    const commentId = c.req.param("commentId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Parse request body
    const body = await c.req.json();

    // Update the nested comment
    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: body.content,
        // Add other fields to update as needed
      },
    });

    return c.json({ updatedComment });
  } catch (error) {
    console.error("Error updating nested comment:", error);
    c.status(500); // Internal Server Error
    return c.json({ error: "Internal server error" });
  }
});

nestedCommentRouter.delete("/:commentId", async (c) => {
  try {
    const userId = c.get("userId");
    const commentId = c.req.param("commentId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Delete the nested comment
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return c.json({ message: "Nested comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting nested comment:", error);
    c.status(500); // Internal Server Error
    return c.json({ error: "Internal server error" });
  }
});

// Export the nested comment router
export default nestedCommentRouter;
