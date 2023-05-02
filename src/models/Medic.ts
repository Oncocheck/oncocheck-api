import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "../models/User"
import { Exam } from "./Exam"

@Entity()
export class Medic {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  crm: string

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User

  @ManyToMany(() => Exam)
  @JoinTable({ name: 'favorite_exams' })
  favoriteExams: Exam[]
}