import 'dotenv/config'
import fastify from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

import { Database } from '@/database'
import routes from '@/routes'

Database.initialize()
  .then(async () => {
    const server = fastify().withTypeProvider<TypeBoxTypeProvider>()

    server.register(routes)

    server.listen({ port: 8080 }, (err, address) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`Server listening at ${address}`)
    })
  }).catch(error => {
    console.error(error)
  })
