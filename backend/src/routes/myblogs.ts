import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { updatePost } from "@akshitlakhera/common-zod-app";
export const myBlogsRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();
// Define middlewares
myBlogsRouter.use(async (c, next) => {
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
// Get all the blogs for the specific user
myBlogsRouter.get("/user--blogs", async (c) => {
  try {
    const userId = c.get("userId");

    // Check if userId is valid
    if (!userId) {
      console.error("Invalid userId:", userId);
      c.status(400);
      return c.json({ error: "Invalid user ID" });
    }

    console.log("Fetching blogs for userId:", userId);

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Retrieve blog posts for the specific user
    const userBlogs = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        publishedDate: true,
      },
    });

    // Check if userBlogs is empty
    if (!userBlogs || userBlogs.length === 0) {
      console.error("No blog posts found for userId:", userId);
      c.status(404);
      return c.json({ error: "No blog posts found for the user" });
    }

    console.log("User's blog posts:", userBlogs);

    // Return the retrieved blog posts
    return c.json({ userBlogs });
  } catch (error) {
    console.error("Error fetching user's blogs:", error);
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});
//   Delete blog route
myBlogsRouter.delete("/:id", async (c) => {
  const authorId = c.get("userId");
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  //  Check if blog exisits
  try {
    const existingBlog = await prisma.post.findFirst({
      where: {
        id,
        authorId,
      },
    });
    if (!existingBlog) {
      console.log("Blog does not found");
      c.status(404);
      return c.json({
        error: "Blog does not found",
      });
    }
    //  Deleting the blog
    await prisma.post.delete({
      where: {
        id: existingBlog.id,
      },
    });
    await console.log("Blog deleted successfully");

    // Finalize the response
    c.status(200); // No content to return
    return c.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});
//    Update blog code
// I can see some problem here lets see
myBlogsRouter.put("/edit", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = updatePost.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }
  const updateBlog = await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  if (updateBlog) {
    return c.json({ messgae: "Blog post successfully updated" });
  } else {
    c.status(401);
    return c.json({
      error: "Blog does n't get updated",
    });
  }
});
