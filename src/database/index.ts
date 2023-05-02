import 'dotenv/config'
import "reflect-metadata"
import { DataSource } from "typeorm"

import config from '../config'

export const Database = new DataSource({
  type: 'mysql',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: true,
  logging: false,
  entities: ["src/models/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  subscribers: [],
})
