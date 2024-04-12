import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import axios from "axios";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { createPostInput, updatePost } from "@akshitlakhera/common-zod-app";
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Define function to upload image to Cloudinary
async function uploadToCloudinary(file: File): Promise<string> {
  try {
    // Form data to send to Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "xnmsv5nu"); // Replace with your Cloudinary upload preset

    // Make POST request to Cloudinary upload endpoint
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dpa9wpgxf/image/upload",
      formData
    );

    // Return URL of the uploaded image from the response
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error; // Propagate error to the caller
  }
}
// Middleware
// My first goal is to check these middleware calls why there are giving errors.
// The * character in the route pattern /api/v1/blog/* acts as a wildcard.
blogRouter.use(async (c, next) => {
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
// Routing
// Routing
blogRouter.post("/", async (c) => {
  try {
    const userId = c.get("userId");
    console.log("userId:", userId); // Log userId for debugging
    const publishedDate = new Date(); // Get the current date and time

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    // zod check
    const { success } = createPostInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input" });
    }
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId, //blog get saved with specific userId (payload one) automatically
        publishedDate,
      },
    });

    return c.json({
      id: blog.id,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    c.status(500); // Internal Server Error
    return c.json({ error: "Internal server error" });
  }
});

//    Update blog code
// I can see some problem here lets see
blogRouter.put("/", async (c) => {
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

//    Route to get all the blogs
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
//  Route to get all the blogs with specific id
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

//   Delete blog route
blogRouter.delete("/:id/delete", async (c) => {
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

//  Image upload route cloudinary
blogRouter.post("/upload", async (c) => {
  try {
    const formData = await c.req.formData(); // Acess form data from the request
    const file = formData.get("file"); //Get the image file from the form data
    const body = await c.req.json(); // Parse the JSON body of the request
    // Extract postId from the request body
    const postId = body.postId; // Assuming postId is passed in the request body
    // Check if postId is present and valid
    if (!postId) {
      console.error("Error uploading image: postId is missing or invalid");
      c.status(400); // Bad request
      return c.json({ error: "postId is missing or invalid" });
    }
    // Check if file is not null before calling uploadToCloudinary
    if (file instanceof File) {
      // Upload image to Cloudinary
      const imageUrl = await uploadToCloudinary(file);
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      // Store the image URL in your Prisma backend
      const newImage = await prisma.image.create({
        data: {
          url: imageUrl, // Store the URL of the uploaded image
          postId: postId, // Associate the image with the user
          // You may also associate the image with other entities as needed
        },
      });

      // Return the URL of the uploaded image in the response
      return c.json({ imageUrl });
    } else {
      // Handle the case where file is null
      console.error("Error uploading image: File is null");
      c.status(400); // Bad request
      return c.json({ error: "File is null" });
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});
//   Route to get the image
blogRouter.get("/images/:imageId", async (c) => {
  try {
    const imageId = c.req.param("imageId"); // Get the image ID from the request parameters

    // Check if imageId is present and valid
    if (!imageId) {
      console.error("Error accessing image: Image ID is missing or invalid");
      c.status(400); // Bad request
      return c.json({ error: "Image ID is missing or invalid" });
    }

    // Retrieve the image URL from the database using Prisma
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const image = await prisma.image.findUnique({
      where: {
        id: imageId,
      },
    });

    // Check if the image with the specified ID exists
    if (!image) {
      console.error("Error accessing image: Image not found");
      c.status(404); // Not found
      return c.json({ error: "Image not found" });
    }

    // Return the URL of the image in the response
    return c.json({ imageUrl: image.url });
  } catch (error) {
    console.error("Error accessing image:", error);
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});
