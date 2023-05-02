import { ExamService } from "../services/Exam";
import { MedicService } from "../services/Medic";
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";

interface JWTDecodedData {
  userId: number
  userType: string
  login: string
  iat: number
}

export class FavoriteExamController {
  constructor(
    private readonly examService = new ExamService(),
    private readonly medicService = new MedicService(),
  ) { }

  async index(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request.user as JWTDecodedData).userId

      const favoriteExamsResult = await this.medicService.getFavoriteExams(
        userId
      )

      if (!favoriteExamsResult.success) {
        return reply.status(404).send({ error: favoriteExamsResult.error })
      }

      return reply.status(200).send({ data: favoriteExamsResult.data })
    } catch (err) {
      return reply.status(500).send({ error: err })
    }
  }

  async update(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) {
    try {
      await request.jwtVerify()

      const userId = (request.user as JWTDecodedData).userId

      const getExamResult = await this.examService.getExamById(request.params.id)

      if (!getExamResult.success) {
        return reply.status(404).send({
          error: "Nenhum exame com o id fornecido."
        })
      }

      const favoriteExamResult = await this.medicService.favoriteExam(
        userId,
        getExamResult.data
      )

      if (!favoriteExamResult.success) {
        return reply.status(404).send({ error: favoriteExamResult.error })
      }

      return reply.status(204).send()
    } catch (err) {
      return reply.status(500).send({ error: err })
    }
  }
}