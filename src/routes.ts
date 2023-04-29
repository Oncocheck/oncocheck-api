import { FastifyInstance } from 'fastify'

import { MedicController } from '@/controllers/Medic';

async function routes(fastify: FastifyInstance) {
  const medicController = new MedicController();

  fastify.get("/", async (_, __) => {
    return { message: 'Hello World!' }
  });

  fastify.get("/medics", medicController.index.bind(medicController));
  fastify.post("/signup", medicController.create.bind(medicController));
}

export default routes