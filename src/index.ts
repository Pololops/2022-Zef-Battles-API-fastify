import * as dotenv from 'dotenv'
dotenv.config();

import { app } from './app/app'

const port = Number(process.env.PORT) || 5000
const host = process.env.HOST

const start = async () => {
  try {
    await app.listen({ host, port });
    console.log(`✅ Server running on ${host}:${port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()