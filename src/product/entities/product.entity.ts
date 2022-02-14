import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  title: string;
  @Column({ default: 0 })
  price: number;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  image: string;

  // @Column({ default: '' })
  // rating: rate;

  @CreateDateColumn({ default: new Date(), type: 'timestamp' })
  createdAt: Date;
}

// export class rate {
//   rate: number;
//   count: number;
// }
