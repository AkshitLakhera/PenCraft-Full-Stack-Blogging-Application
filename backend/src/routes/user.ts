import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { siginInput, signupInput } from "@akshitlakhera/common-zod-app";
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
//                                          Signup
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }
  try {
    const hashedPassword = await hashPassword(body.password);
    const user = await prisma.user.create({
      data: {
        name: body.name, //forgot to add this field earlier ,
        email: body.email,
        password: hashedPassword,
      },
    });
    // Defined the jwt secret in wrangler.toml and also defiend type inside binding at hono.
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token: jwt, name: user.name });
  } catch (e) {
    return c.status(403);
  }
});

// Hashing password logic
async function hashPassword(password: string): Promise<string> {
  // Convert the password string to a Uint8Array buffer
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  // Hash the password using SHA-256 Algorithm
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  // convert this hasbuffer into hexadecimal(readable string)
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
//                                                 Sigin in

userRouter.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = siginInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input" });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      // Return a 401 Unauthorized error response if the user is not found
      // Cloudflare Workers, don't directly support chaining response methods like Express.js does.
      c.status(401);
      return c.json({ error: "Incorrect user found" });
    }

    // Compare the hashed password from the database with the hashed password from the request
    const hashedPassword = await hashPassword(body.password);
    if (hashedPassword !== user.password) {
      // Return a 401 Unauthorized error response if the password is incorrect
      c.status(401);
      return c.json({ error: "Incorrect password" });
    }

    // Generate a JWT token for authentication
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    // Return the JWT token as a response
    return c.json({ token: jwt, name: user.name });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error signing in:", error);
    // Return a 500 Internal Server Error response
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});
