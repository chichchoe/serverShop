import { Photo } from '../../photo/entities/photo.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('user_info')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ unique: true })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  @Column({ nullable: true })
  refresh_token?: string;

  @Column({ nullable: true, type: 'timestamp' })
  expiresIn?: Date;

  @CreateDateColumn({ default: new Date(), type: 'timestamp' })
  createdAt: Date;
}
