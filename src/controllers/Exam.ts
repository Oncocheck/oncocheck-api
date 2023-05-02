import { FastifyReply, FastifyRequest } from "fastify";

import { ExamService } from "../services/Exam";

interface IndexExamsQuery {
  organ: string
}

interface CreateExamParams {
  name: string
  description: string
  organs: number[]
}

export class ExamController {
  constructor(
    private readonly examService = new ExamService()
  ) { }

  async index(
    request: FastifyRequest<{ Querystring: IndexExamsQuery }>,
    reply: FastifyReply
  ) {
    try {
      const organ = request.query.organ
      const search = await this.examService.getExamsByOrgan(organ)

      if (!search.success) {
        return reply.status(404).send({ error: search.error })
      }

      return reply.status(200).send({ data: search.data })
    } catch (err) {
      return reply.status(500).send({ error: err })
    }
  }

  async show(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) {
    try {
      const examId = request.params.id
      const getExamResult = await this.examService.getExamById(examId)

      if (!getExamResult.success) {
        return reply.status(404).send({ error: getExamResult.error })
      }

      return reply.status(200).send({ data: getExamResult.data })
    } catch (err) {
      return reply.status(500).send({ error: err })
    }
  }

  async create(
    request: FastifyRequest<{ Body: CreateExamParams }>,
    reply: FastifyReply
  ) {
    try {
      const newExamResult = await this.examService.createExam(request.body)

      if (newExamResult.success) {
        return reply.status(201).send({ data: newExamResult.data })
      } else {
        return reply.status(400).send({ error: newExamResult.error })
      }
    } catch (err) {
      return reply.status(500).send({ error: err })
    }
  }
}