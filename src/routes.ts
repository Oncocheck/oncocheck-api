import { FastifyInstance } from 'fastify'

import { MedicController } from '@/controllers/Medic';
import { SessionController } from '@/controllers/Session'

async function routes(fastify: FastifyInstance) {
  const medicController = new MedicController();
  const sessionController = new SessionController(fastify);

  fastify.get("/", async (_, __) => {
    return { message: 'Hello World!' }
  });

  fastify.get("/medics", medicController.index.bind(medicController));

  fastify.post("/signin", sessionController.create.bind(sessionController))
  fastify.post("/signup", medicController.create.bind(medicController));
}

export default routes