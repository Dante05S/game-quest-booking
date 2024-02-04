import { type Response } from '@/interfaces/response.interface';
import { type IService } from '@/interfaces/service.interface';
import {
  type User,
  type RegisterUser,
  type EmailUser,
  type CodeVerifyUser,
  type TokenUser,
  type TokenSessionUser,
  type LoginUser
} from '@/models/User.interface';
import Service from './Service';

interface IAuthService extends IService<User> {
  register: (data: RegisterUser) => Promise<Response<User>>;
  login: (data: LoginUser) => Promise<Response<TokenUser>>;
  validateCode: (data: CodeVerifyUser) => Promise<Response<TokenUser>>;
  resendCode: (email: string) => Promise<Response<null>>;
  setCookieEmail: (email: string) => Promise<Response<EmailUser>>;
  deleteCookieEmail: () => Promise<Response<null>>;
  setCookieToken: (token: string) => Promise<Response<TokenSessionUser>>;
  getCookieToken: () => Promise<Response<string>>;
  deleteCookieToken: () => Promise<Response<null>>;
}

export default class AuthService extends Service<User> implements IAuthService {
  constructor() {
    super('auth');
  }

  async register(data: RegisterUser): Promise<Response<User>> {
    this.setEndpoint('auth/register');
    const response: Response<User> = await this.post({ ...data }, true);
    return response;
  }

  async login(data: LoginUser): Promise<Response<TokenUser>> {
    this.setEndpoint('auth/login');
    const response: Response<TokenUser> = await this.post({ ...data }, true);
    return response;
  }

  async refresh(token: string): Promise<Response<TokenUser>> {
    this.setEndpoint('auth/refresh');
    const response: Response<TokenUser> = await this.get(null, false, token);
    return response;
  }

  async validateCode(data: CodeVerifyUser): Promise<Response<TokenUser>> {
    this.setEndpoint('auth/validate-code');
    const response: Response<TokenUser> = await this.post({ ...data }, true);
    return response;
  }

  async resendCode(email: string): Promise<Response<null>> {
    this.setEndpoint('/auth/resend-code');
    const response: Response<null> = await this.post({ email }, true);
    return response;
  }

  async setCookieEmail(email: string): Promise<Response<EmailUser>> {
    const response = await fetch('/api/auth/set-cookie-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json() as unknown as Response<EmailUser>;
  }

  async deleteCookieEmail(): Promise<Response<null>> {
    const response = await fetch('/api/auth/delete-cookie-email');
    return response.json() as unknown as Response<null>;
  }

  async setCookieToken(token: string): Promise<Response<TokenSessionUser>> {
    const response = await fetch('/api/auth/set-cookie-token', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json() as unknown as Response<TokenSessionUser>;
  }

  async getCookieToken(): Promise<Response<string>> {
    const response = await fetch('/api/auth/get-cookie-token', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json() as unknown as Response<string>;
  }

  async deleteCookieToken(): Promise<Response<null>> {
    const response = await fetch('/api/auth/delete-cookie-token');
    return response.json() as unknown as Response<null>;
  }
}
