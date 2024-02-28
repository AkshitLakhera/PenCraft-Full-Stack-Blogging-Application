import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { use } from 'hono/jsx';
import { decode, sign, verify } from 'hono/jwt'
import { userRouter } from './routes/user';
// This is a way to define type in typescript with hono

// This is how we give type to variables in typescript
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string,
	},
  Variables : {
		userId: string
	}
}>();
// Middleware
// The * character in the route pattern /api/v1/blog/* acts as a wildcard. 
app.use('/api/v1/blog/*', async (c, next) => {
  // Get the header
  // verify the header
  // if header is correct we need to proceed
  // if not correct return error
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

//Always try to initialize as many thing in inside not in global context as it could start worker on specific route and you coould loose data
// Routing
app.route('/api/v1/user', userRouter)
app.post('/api/v1/blog',(c) => {
  console.log(c.get('userId'))
  return c.text('signin route')
})

app.put('/api/v1/blog',(c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/:id',(c) => {
  return c.text('Hello Hono!')
})


export default app
