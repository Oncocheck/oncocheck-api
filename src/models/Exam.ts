import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Organ } from "./Organ";
import { TumorMarquer } from "./TumorMarquer";

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: 'text' })
  description: string

  @Column()
  source: string

  @ManyToMany(() => Organ)
  @JoinTable({ name: 'exam_organs' })
  organs: Organ[]

  @ManyToMany(() => TumorMarquer)
  @JoinTable({ name: 'exam_markers' })
  markers: TumorMarquer[]
}