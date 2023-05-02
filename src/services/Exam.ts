import { Database } from "../database";
import { Exam } from "../models/Exam";
import { Organ } from "../models/Organ";

interface CreateExamParams {
  name: string
  description: string
  organs: number[]
}

export class ExamService {
  constructor(
    private readonly organRepository = Database.getRepository(Organ),
    private readonly examRepository = Database.getRepository(Exam)
  ) { }

  async getOrgans() {
    const organs = await this.organRepository.find()

    return { success: true, data: organs }
  }

  async getExamById(examId: number) {
    const exam = await this.examRepository.findOne({
      where: { id: examId },
      relations: ['organs', 'markers']
    })

    if (!exam) {
      return { success: false, error: 'No exam with the given id.' }
    }

    return { success: true, data: exam }
  }

  async getExamsByOrgan(organ: string) {
    const availableOrgans = await this.getOrgans()

    const existentOrgan = availableOrgans.data.find(availableOrgan => {
      return availableOrgan.name === organ
    })

    if (!existentOrgan) {
      return {
        success: false,
        error: 'Buscando por um orgão inválido.'
      }
    }

    const examsByOrgan = await this.examRepository.findBy({
      organs: [existentOrgan]
    })

    return {
      success: true,
      data: examsByOrgan.map(exam => ({
        id: exam.id,
        name: exam.name,
        organs: exam.organs
      }))
    }
  }

  async createExam(params: CreateExamParams) {
    const relatedOrgans = await this.organRepository.find({
      where: params.organs.map(organ => ({ id: organ }))
    })

    if (relatedOrgans.length === 0) {
      return {
        success: false,
        error: 'Um exame deve estar relacionado a pelo menos 1 orgão.'
      }
    }

    const newExam = this.examRepository.create({
      name: params.name,
      description: params.description,
      organs: relatedOrgans
    })

    await this.examRepository.save(newExam)

    return { success: true, data: newExam.id }
  }
}