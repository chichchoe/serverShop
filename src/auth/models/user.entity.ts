import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from './role.enum';
import { FeedPostEntity } from '../../feed/entities/feed.entity';
import { Exclude } from 'class-transformer';

@Entity('user_account')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  imagePath: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ nullable: true })
  @Exclude()
  public hashedRefreshToken?: string;

  @OneToMany(() => FeedPostEntity, (feedPostEntity) => feedPostEntity.author)
  feedPosts: FeedPostEntity[];
}
