import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Organ } from "./Organ";

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: 'text' })
  description: string

  @ManyToMany(() => Organ)
  @JoinTable({ name: 'exam_organs' })
  organs: Organ[]
}