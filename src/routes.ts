import { FastifyInstance } from 'fastify'

import { MedicController } from '@/controllers/Medic';
import { SessionController } from '@/controllers/Session'
import { ExamController } from '@/controllers/Exam';
import { OrganController } from '@/controllers/Organ';

async function routes(fastify: FastifyInstance) {
  const medicController = new MedicController();
  const sessionController = new SessionController(fastify);
  const examController = new ExamController()
  const organController = new OrganController()

  fastify.get("/", async (_, __) => {
    return { message: 'Hello World!' }
  });

  fastify.get("/medics", medicController.index.bind(medicController));

  fastify.post("/signin", sessionController.create.bind(sessionController))
  fastify.post("/signup", medicController.create.bind(medicController));

  fastify.get("/organs", organController.index.bind(organController))
  fastify.get("/exams/:organ", examController.index.bind(examController))
  fastify.post("/exams", examController.create.bind(examController))
}

export default routes