import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "@/models/User"

@Entity()
export class Medic {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  crm: string

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User
}