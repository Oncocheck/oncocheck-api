export default {
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  user: {
    passwordSalt: 12
  },
  auth: {
    jwtSecretKey: process.env.JWT_SECRET_KEY
  }
}