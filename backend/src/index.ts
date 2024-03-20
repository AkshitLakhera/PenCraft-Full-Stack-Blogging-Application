import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from './routes/user';
import { blogRouter }  from './routes/blog' ;
import { bookMarkRouter } from './routes/bookmark';
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
app.use('/*', cors())
//Always try to initialize as many thing in inside not in global context as it could start worker on specific route and you coould loose data
// Routing
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog',blogRouter);
app.route('/api/v1/bookmark',bookMarkRouter)
export default app
