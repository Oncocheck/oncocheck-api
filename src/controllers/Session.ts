import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { SessionService } from "@/services/Session";

interface CreateSession {
  login: string
  password: string
}

export class SessionController {
  constructor(
    private fastify: FastifyInstance,
    private readonly sessionService = new SessionService()
  ) { }

  async create(
    request: FastifyRequest<{ Body: CreateSession }>,
    reply: FastifyReply
  ) {
    const { login, password } = request.body
    const result = await this.sessionService.signIn(login, password)

    if (!result.success) {
      return reply.status(400).send({
        success: false,
        error: result.error
      })
    } else {
      const accessToken = this.fastify.jwt.sign(result.data)

      return reply.status(200).send({
        success: true,
        data: { ...result.data, accessToken }
      })
    }
  }
}