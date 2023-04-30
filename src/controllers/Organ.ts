import { FastifyReply, FastifyRequest } from "fastify";

import { ExamService } from "@/services/Exam";

export class OrganController {
  constructor(
    private readonly examService = new ExamService()
  ) { }

  async index(_: FastifyRequest, reply: FastifyReply) {
    try {
      const organs = await this.examService.getOrgans()

      return reply.status(200).send({ data: organs.data })
    } catch (err) {
      return reply.status(500).send({ error: err })
    }
  }
}