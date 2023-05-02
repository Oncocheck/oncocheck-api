import { ExamService } from "../services/Exam";
import { ExamInconsistencyService } from "../services/Inconsistency";
import { FastifyReply, FastifyRequest } from "fastify";

export class InconsistencyController {
  constructor(
    private readonly inconsistencyService = new ExamInconsistencyService(),
    private readonly examService = new ExamService()
  ) { }

  async index(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) {
    try {
      const exam = await this.examService.getExamById(request.params.id)

      if (!exam.success || !exam.data) {
        return reply.status(404).send("Exame não encontrado.")
      }

      const inconsistencies = await this
        .inconsistencyService
        .getInconsistenciesByExam(exam.data)

      return reply.status(200).send({ data: inconsistencies.data })
    } catch (err) {
      return reply.status(500).send({ error: err })
    }
  }
}