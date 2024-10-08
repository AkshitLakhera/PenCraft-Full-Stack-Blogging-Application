import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
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

// Middleware
commentRouter.use(async (c, next) => {
  try {
    const jwt = c.req.header("Authorization");
    if (!jwt) {
      c.status(401);
      return c.json({ error: "Unauthorized" });
    }
    const token = jwt.split(" ")[1];
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

// Route to create comment (including nested comments) <----------------
commentRouter.post("posts/:postId/comments", async (c) => {
  try {
    const userId = c.get("userId");
    const postId = c.req.param("postId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Parse request body
    const body = await c.req.json();
    const parentId = body.parentId || null; // Ensure parentId is included

    const comment = await prisma.comment.create({
      data: {
        content: body.content,
        postId: postId,
        userId,
        parentId, // Set the parent comment ID if it's a reply
      },
    });
    return c.json({ comment });
  } catch (error) {
    console.error("Error creating comment:", error);
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});

// Update comment
commentRouter.put("/comments/:commentId", async (c) => {
  try {
    const userId = c.get("userId");
    const body = await c.req.json();
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
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});

// Delete comment
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
    return c.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});

// Fetch all comments for a post (including nested comments) <-------------------
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
        parentId: null, // Fetch only top-level comments
      },
      include: {
        replies: { // Include nested comments
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
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