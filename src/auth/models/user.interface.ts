import { IsEmail, IsString } from 'class-validator';
import { FeedPost } from '../../feed/models/post.interface';
import { Role } from './role.enum';

export class User {
  id?: number;
  firstName?: string;
  lastName?: string;
  @IsEmail()
  email?: string;
  @IsString()
  password?: string;
  imagePath?: string;
  role?: Role;
  hashedRefreshToken?: string;
  posts?: FeedPost[];
}
export class RefreshToken {
  refresh_token?: string;
}
