import dotenv from 'dotenv'
dotenv.config()

import app from './app/app'

const port = Number(process.env.PORT) || 5000
const host = process.env.HOST

app.listen({ host, port }, (error) => {
  if (error) {
    app.log.error(error)
    throw process.exit(1)
  }
  console.log(`✅ Server is running on ${host}:${port}`)
})

