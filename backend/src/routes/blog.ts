import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import axios from "axios";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { createPostInput, updatePost } from "@akshitlakhera/common-zod-app";
import cloudinary from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "blog-images",
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage: storage });

// Middleware
blogRouter.use(async (c, next) => {
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

// Create a blog post with optional image upload
blogRouter.post("/", upload.single("image"), async (c) => {
  try {
    const userId = c.get("userId");
    console.log("userId:", userId);
    const publishedDate = new Date();

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = createPostInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "Invalid input" });
    }

    const imageUrl = c.req.file ? c.req.file.path : null;

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
        publishedDate,
        imageUrl, // Saving the image URL
      },
    });

    return c.json({
      id: blog.id,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});

// Image Upload Route
blogRouter.post("/upload-image", upload.single("image"), async (c) => {
  try {
    const file = c.req.file;
    if (!file) {
      c.status(400);
      return c.json({ error: "No file uploaded" });
    }

    const imageUrl = file.path;

    return c.json({
      message: "Image uploaded successfully",
      imageUrl: imageUrl,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    c.status(500);
    return c.json({ error: "Failed to upload image" });
  }
});

// Update blog post
blogRouter.put("/", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = updatePost.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid input" });
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
    return c.json({ message: "Blog post successfully updated" });
  } else {
    c.status(401);
    return c.json({
      error: "Blog doesn't get updated",
    });
  }
});

// Get all blogs
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      publishedDate: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return c.json({
    blogs,
  });
});

// Get a specific blog by id
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blog = await prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      publishedDate: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return c.json({ blog });
});
