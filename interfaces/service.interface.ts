import { type Response } from './response.interface';

export interface IService<T> {
  getAll: () => Promise<Response<T[]>>;
  getById: (id: string) => Promise<Response<T>>;
  create: (data: Record<string, unknown>) => Promise<Response<T>>;
  update: (id: string, data: Record<string, unknown>) => Promise<Response<T>>;
  remove: (id: string) => Promise<Response<T>>;
}
