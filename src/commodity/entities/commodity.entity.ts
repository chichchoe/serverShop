import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('commodity')
export class CommodityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  color: string;

  @Column()
  department: string;

  @Column()
  productName: string;

  @Column()
  price: number;

  @Column()
  productAdjective: string;

  @Column()
  productMaterial: string;

  @Column()
  productDescription: string;

  @Column()
  product: string;

  @CreateDateColumn({ default: new Date(), type: 'timestamp' })
  createdAt: Date;
}
