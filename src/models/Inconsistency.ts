import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Exam } from './Exam'

@Entity()
export class Inconsistency {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @ManyToOne(() => Exam)
  @JoinColumn()
  exam: Exam
}