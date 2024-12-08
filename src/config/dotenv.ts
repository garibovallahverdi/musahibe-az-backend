import dotenv from "dotenv"

dotenv.config()


export const PORT = process.env.PORT || 3000

export const REDISHOST = process.env.REDISHOST
export const REDISPORT = process.env.REDISPORT
export const REDISPASSWORD = process.env.REDISPASSWORD

export const NODE_ENV = process.env.NODE_ENV
export const SESSION_SECRET = process.env.SESSION_SECRET