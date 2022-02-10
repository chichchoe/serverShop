import { User } from 'src/auth/models/user.interface';

export class CreateFeedDto {
  id?: number;
  body?: string;
  createdAt?: Date;
  author?: User;
}
