export class UserModel {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  refresh_token?: string;
  expiresIn?: string;
  createdAt?: Date;
}
