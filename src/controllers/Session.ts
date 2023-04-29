import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { UserService } from "@/services/User";

interface CreateSession {
  login: string
  password: string
}

export class SessionController {
  constructor(
    private fastify: FastifyInstance,
    private readonly userService = new UserService()
  ) { }

  async create(
    request: FastifyRequest<{ Body: CreateSession }>,
    reply: FastifyReply
  ) {
    const { login, password } = request.body
    const result = await this.userService.signIn(login, password)

    if (!result.success) {
      return reply.status(400).send({
        success: false,
        error: result.error
      })
    } else {
      const accessToken = this.fastify.jwt.sign(result.data)

      console.log(accessToken)

      return reply.status(200).send({
        success: true,
        data: { ...result.data, accessToken }
      })
    }
  }
}