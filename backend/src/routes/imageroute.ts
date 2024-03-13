import { Hono } from 'hono'
export const imageRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET:string,
	},
    Variables :{
        userId :string
    }
}>();