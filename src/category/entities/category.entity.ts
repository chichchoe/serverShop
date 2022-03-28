import { Column, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
