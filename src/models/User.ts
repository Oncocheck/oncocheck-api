import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  login: string

  @Column()
  password: string

  @Column()
  type: string

  @Column({ unique: true })
  email: string
}
