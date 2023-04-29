import "reflect-metadata"
import { DataSource } from "typeorm"

import config from '@/config'
import { User } from "@/models/User"
import { Medic } from "@/models/Medic"

export const Database = new DataSource({
  type: 'mysql',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: true,
  logging: false,
  entities: [User,Medic],
  migrations: [],
  subscribers: [],
})
