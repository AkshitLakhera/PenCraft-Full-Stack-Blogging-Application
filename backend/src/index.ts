import { Hono } from 'hono'

const app = new Hono()

// Routing
app.post('/api/v1/signup',(c) => {
  return c.text('Hello Hono!')
})
app.post('/api/v1/signin',(c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/blog',(c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/blog',(c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/blog/:id',(c) => {
  return c.text('Hello Hono!')
})


export default app
