import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TumorMarquer {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}