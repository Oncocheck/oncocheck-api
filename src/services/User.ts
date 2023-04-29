import { Database } from "@/database";
import { User } from "@/models/User";

import * as bcrypt from 'bcryptjs'

export class UserService {
  constructor(
    private readonly userRepository = Database.getRepository(User)
  ) { }

  async signIn(login: string, password: string) {
    const registeredUser = await this.userRepository.findOneBy({ login })

    if (!registeredUser) {
      return {
        success: false,
        error: 'Login informado incorreto ou usuário não está cadastrado.'
      }
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      registeredUser.password
    )

    if (!isPasswordCorrect) {
      return { success: false, error: 'Senha incorreta.' }
    }

    return {
      success: true,
      data: {
        id: registeredUser.id,
        login: registeredUser.login,
        type: registeredUser.type
      }
    }
  }
}