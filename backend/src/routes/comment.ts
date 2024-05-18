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
//   Route to create comment  (including nested comments)
commentRouter.post("posts/:postId/comments", async (c) => {
  try {
    const userId = c.get("userId");
    const postId = c.req.param("postId");
    const publishedDate = new Date(); // Get the current date and time
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    // Parse request body
    const body = await c.req.json();
    // Check if the comment is a reply to another comment (nested)
    const parentId = body.parentId ? body.parentId : null;
    const comment = await prisma.comment.create({
      data: {
        content: body.content,
        postId: postId,
        userId,
        parentId: parentId, // Set the parent comment ID if it's a reply
        //prisma will automatically handle date part
      },
    });
    return c.json({ comment });
  } catch (error) {
    console.error("Error creating comment:", error);
    c.status(500); // Internal Server Error
    return c.json({ error: "Internal server error" });
  }
});

// to update the comment(nestedcomments)
commentRouter.put("/comments/:commentId", async (c) => {
  try {
    const userId = c.get("userId");
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const commentId = c.req.param("commentId");
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
// Delete the commentRouter
commentRouter.delete("/comments/:commentId", async (c) => {
  try {
    const userId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const commentId = c.req.param("commentId");
    const existingComment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!existingComment || existingComment.userId !== userId) {
      c.status(401);
      return c.json({ error: "Unauthorized" });
    }
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return c.json({ message: "comment deleted successfully" });
  } catch (error) {
    console.error("Error updating comment:", error);
    c.status(500); // Internal Server Error
    return c.json({ error: "Internal server error" });
  }
});
// Route to get all comments for a post (with bested comments )
// Fetch all comments for a post (including nested comments)
commentRouter.get("/posts/:postId/comments", async (c) => {
  try {
    const postId = c.req.param("postId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Get all comments for the post (including nested comments)
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        // Include nested comments
        childComments: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    c.status(500); // Internal Server Error
    return c.json({ error: "Internal server error" });
  }
});
