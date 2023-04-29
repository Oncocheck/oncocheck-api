import { Type, Static } from "@sinclair/typebox";
import { FastifyReply, FastifyRequest } from "fastify";

import { MedicService } from "@/services/Medic";

const CreateMedicSchema = Type.Object({
  name: Type.String(),
  login: Type.String(),
  email: Type.String(),
  password: Type.String(),
  crm: Type.String(),
})

type CreateMedicBody = Static<typeof CreateMedicSchema>

export class MedicController {
  private readonly medicService: MedicService

  constructor() {
    this.medicService = new MedicService()
  }

  async index(_: FastifyRequest, reply: FastifyReply) {
    const getMedicsResult = await this.medicService.getAllMedics()

    return reply.status(200).send({ data: getMedicsResult.data })
  }

  async create(request: FastifyRequest<{ Body: CreateMedicBody }>, reply: FastifyReply) {
    try {
      const newUserResult = await this.medicService.createMedic(request.body)

      if (!newUserResult.success) {
        return reply.status(400).send({ error: newUserResult.error })
      }

      return reply.status(201).send()
    } catch (err) {
      return reply.status(500).send({ error: err })
    }
  }
}