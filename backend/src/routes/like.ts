import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
export const likeRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();
// Define middlewares
likeRouter.use(async (c, next) => {
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
//  Creating route
// Route to like a blog post
likeRouter.post("/:postId/like", async (c) => {
  try {
    const userId = c.get("userId");
    const postId = c.req.param("postId");

    // Check if the user has already liked the post
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      // If the user has already liked the post, return an error
      c.status(400);
      return c.json({ error: "You have already liked this post" });
    } else {
      // If the user has not liked the post, add a new like
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });

      // Increment the likes count for the post
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likeCount: {
            increment: 1,
          },
        },
      });

      // Fetch the updated like count for the post
      const updatedPost = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        select: {
          likeCount: true,
        },
      });

      if (!updatedPost) {
        // Handle the case where the post is not found
        // You can return an error response or handle it based on your application's requirements
        console.error("Post not found");
        c.status(404);
        return c.json({ error: "Post not found" });
      }

      return c.json({
        message: "Post liked successfully",
        likeCount: updatedPost.likeCount,
      });
    }
  } catch (error) {
    console.error("Error liking blog post:", error);
    c.status(500); // Internal Server Error
    return c.json({ error: "Internal server error" });
  }
});

/// Route to dislike a blog post
likeRouter.delete("/dislike/:postId", async (c) => {
  try {
    const userId = c.get("userId");
    const postId = c.req.param("postId");

    // Check if the user has already liked the post
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (!existingLike) {
      // If the user hasn't liked the post, return an error
      c.status(400);
      return c.json({ error: "You have not liked this post yet" });
    } else {
      // If the user has liked the post, delete the like
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      // Decrement the likes count for the post
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likeCount: {
            decrement: 1,
          },
        },
      });

      // Fetch the updated like count for the post
      const updatedPost = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        select: {
          likeCount: true,
        },
      });

      if (!updatedPost) {
        // Handle the case where the post is not found
        console.error("Post not found");
        c.status(404);
        return c.json({ error: "Post not found" });
      }

      return c.json({
        message: "Post disliked successfully",
        likeCount: updatedPost.likeCount,
      });
    }
  } catch (error) {
    console.error("Error disliking blog post:", error);
    c.status(500); // Internal Server Error
    return c.json({ error: "Internal server error" });
  }
});

// To get the like count
likeRouter.get("/:postId/likeCount", async (c) => {
  try {
    const postId = c.req.param("postId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const postWithLikeCount = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        likeCount: true,
      },
    });

    if (!postWithLikeCount) {
      // Handle the case where the post is not found
      console.error("Post not found");
      c.status(404);
      return c.json({ error: "Post not found" });
    }
    return c.json({
      likeCount: postWithLikeCount.likeCount,
    });
  } catch (error) {
    console.error("Error fetching like count:", error);
    c.status(500); // Internal Server Error
    return c.json({ error: "Internal server error" });
  }
});
