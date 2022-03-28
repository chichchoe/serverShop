import { CategoryEntity } from '../../category/entities/category.entity';
import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoryEntity[];
}
