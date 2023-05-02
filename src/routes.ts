import { FastifyInstance } from 'fastify'

import { MedicController } from './controllers/Medic';
import { SessionController } from './controllers/Session'
import { ExamController } from './controllers/Exam';
import { OrganController } from './controllers/Organ';
import { InconsistencyController } from './controllers/Inconsistency';
import { FavoriteExamController } from './controllers/FavoriteExam';

async function routes(fastify: FastifyInstance) {
  const medicController = new MedicController();
  const sessionController = new SessionController(fastify);
  const examController = new ExamController()
  const organController = new OrganController()
  const inconsistencyController = new InconsistencyController()
  const favoriteExamController = new FavoriteExamController()

  fastify.get("/", async (_, __) => {
    return { message: 'Hello World!' }
  });

  fastify.get("/medics", medicController.index.bind(medicController));

  fastify.post("/signin", sessionController.create.bind(sessionController))
  fastify.post("/signup", medicController.create.bind(medicController));

  fastify.get("/organs", organController.index.bind(organController))
  fastify.get("/exams", examController.index.bind(examController))
  fastify.get("/exams/:id", examController.show.bind(examController))
  fastify.post("/exams", examController.create.bind(examController))

  fastify.get("/exams/favorites", favoriteExamController.index.bind(favoriteExamController))

  fastify.put("/exams/favorites/:id", favoriteExamController.update.bind(favoriteExamController))

  fastify.get("/admin/exams/:id/inconsistencies",
    inconsistencyController.index.bind(inconsistencyController))
}

export default routes