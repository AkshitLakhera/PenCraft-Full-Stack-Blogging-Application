import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign,verify } from 'hono/jwt'
export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET:string,
	},
    Variables :{
        userId :string
    }
}>();
// Middleware
// The * character in the route pattern /api/v1/blog/* acts as a wildcard. 
blogRouter.use('/api/v1/blog/*', async (c, next) => {
    const jwt = c.req.header('Authorization');
    if (!jwt) {
      c.status(401);
          return c.json({ error: "unauthorized" });
    }
    const token = await jwt.split("")[1];
    const payload = await verify(token,c.env.JWT_SECRET)
    if (!payload){
      c.status(401)
      return c.json({error:"Unauthorized"})
    }
    c.set('userId',payload.id)
    
    await next()
  })
  
// Routing
blogRouter.post('/api/v1/blog',(c) => {
    console.log(c.get('userId'))
    return c.text('signin route')
  })
  
blogRouter.put('/api/v1/blog',(c) => {
    return c.text('Hello Hono!')
  })
  
blogRouter.get('/api/v1/blog/:id',(c) => {
    return c.text('Hello Hono!')
  })