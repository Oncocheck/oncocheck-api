import 'dotenv/config'
import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import cors from "@fastify/cors"
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

import { Database } from './database'
import routes from './routes'
import config from './config'

Database.initialize()
  .then(async () => {
    const server = fastify().withTypeProvider<TypeBoxTypeProvider>()

    server.register(cors)
    server.register(fastifyJwt, { secret: config.auth.jwtSecretKey })
    server.register(routes)

    server.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`Server listening at ${address}`)
    })
  }).catch(error => {
    console.error(error)
  })
