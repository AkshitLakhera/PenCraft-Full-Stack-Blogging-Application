import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
export const bookMarkRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Define middlewares
bookMarkRouter.use(async (c, next) => {
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

// Define route handlers

// creating bookmark
bookMarkRouter.post("/:postId", async (c) => {
  try {
    const userId = c.get("userId");
    const postId = c.req.param("postId");

    // Connecting to Prisma
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Check if the bookmark already exists
    const existingBookmark = await prisma.bookmark.findFirst({
      where: {
        userId,
        postId,
      },
    });

    if (existingBookmark) {
      c.status(409); // Conflict
      return c.json({ error: "Bookmark already exists" });
    }

    // Create the bookmark
    const newBookmark = await prisma.bookmark.create({
      data: {
        userId,
        postId,
      },
    });

    c.status(201); // Created
    return c.json(newBookmark);
  } catch (error) {
    console.error("Error creating bookmark:", error);
    c.status(500); // Internal Server Error
    return c.json({ error: "Internal server error" });
  }
});

// Showing all bookmarks
bookMarkRouter.get("/bookmarks", async (c) => {
  try {
    const userId = c.get("userId");
    // Connecting to Prisma
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    // Retrieve bookmarks for the user
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId,
      },
      include: {
        post: true, // Include related post data
        // user: true, // Include user details
      },
    });
    // Return bookmarks
    return c.json({ bookmarks });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});

// Deletingbook mark
bookMarkRouter.delete("/:postId/bookmarks", async (c) => {
  // Connecting to Prisma
  console.log("Deleting bookmark route called");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  const postId = c.req.param("postId");
  console.log("UserID:", userId);
  console.log("PostID:", postId);

  try {
    // Check if the bookmark exists
    const existingBookmark = await prisma.bookmark.findFirst({
      // userID  check is  a ownership check
      where: {
        userId,
        postId,
      },
    });

    if (!existingBookmark) {
      console.log("Bookmark not found");
      c.status(404);
      return c.json({ error: "Bookmark not found" });
    }

    // Delete the bookmark  code
    console.log("Deleting bookmark:", existingBookmark);
    await prisma.bookmark.delete({
      where: {
        id: existingBookmark.id,
      },
    });
    await console.log("Bookmark deleted successfully");

    // Finalize the response
    c.status(200); // No content to return
    return c.json({ message: "Bookmark deleted successfully" });
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});
