import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_info')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  phone: string;

  @Column('int')
  age: number;

  @Column()
  isActive: boolean;
}
