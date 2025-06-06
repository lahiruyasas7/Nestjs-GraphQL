// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
export const applicationConfig = {
    jwt: {
    jwtSecret: process.env[`JWT_SECRET`],
  },
  database: {
    dbUrl: process.env[`DATABASE_URL`],
  }
}