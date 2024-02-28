import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
// This is a way to define type in typescript with hono
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string
	}
}>();

//Always try to initialize as many thing in inside not in global context as it could start worker on specific route and you coould loose data
// Routing
app.post('/api/v1/signup',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
const body = await c.req.json();
try {
  const hashedPassword = await hashPassword(body.password)
  const user =await prisma.user.create({
    data : {
      email:body.email,
      password:hashedPassword
    }
  })
  // Defined the jwt secret in wrangler.toml and also defiend type inside binding at hono.
  const jwt = await sign({id:user.id},c.env. JWT_SECRET)
  return c.json({token:jwt})

}catch(e) {
  return c.status(403)
}
})

// Hashing password logic
async function hashPassword(password:string): Promise<string> {
    // Convert the password string to a Uint8Array buffer
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // Hash the password using SHA-256 Algorithm
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    // convert this hasbuffer into hexadecimal(readable string)
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex  =  hashArray.map(byte => byte.toString(16).padStart(2,'0')).join('');;
    return hashHex
}

app.post('/api/v1/signin',(c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/blog',(c) => {
  return c.text('Hello Hono!')
})

app.put('/api/v1/blog',(c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/:id',(c) => {
  return c.text('Hello Hono!')
})


export default app
