export class LoginRequest {
  public email: string;
  public password: string;
}

export class AuthRequest extends LoginRequest {
  public firstName: string;
  public lastName: string;
}
export class RefreshRequest {
  public refresh_token: string;
}
