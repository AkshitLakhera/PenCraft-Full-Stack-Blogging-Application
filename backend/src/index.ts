import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
// This is a way to define type in typescript with hono
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
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
  const user =await prisma.user.create({
    data : {
      email:body.email,
      password:body.password
    }
  })
  return c.text("jwt here")
}catch(e) {
  return c.status(403)
}
})

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
