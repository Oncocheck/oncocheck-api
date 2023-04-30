import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organ {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string
}