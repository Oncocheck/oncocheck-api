import { Database } from "../database";
import { Exam } from "../models/Exam";
import { Inconsistency } from "../models/Inconsistency";

export class ExamInconsistencyService {
  constructor(
    private readonly inconsistencyRepository = 
      Database.getRepository(Inconsistency)
  ) {}

  async getInconsistenciesByExam(exam: Exam) {
    const inconsistencies = await this.inconsistencyRepository.find({
      where: { exam },
    })

    return { success: true, data: inconsistencies }
  }
}