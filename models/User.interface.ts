export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface RegisterUser extends Omit<User, 'id'> {
  password: string;
}

export interface CodeVerifyUser {
  email: string;
  code_token: string;
}

export interface TokenUser {
  user: User;
  token: string;
}

export type LoginUser = Pick<RegisterUser, 'email' | 'password'>;
export type EmailUser = Pick<User, 'email'>;
export type TokenSessionUser = Pick<TokenUser, 'token'>;
