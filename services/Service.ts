import HttpRequest from './HttpRequest';
import { type Response } from '@/interfaces/response.interface';
import { type IService } from '@/interfaces/service.interface';
import { type ResponseObjectData } from '@/types/response_data.type';

export default class Service<T> extends HttpRequest implements IService<T> {
  async getAll(
    isPublic = false,
    token: string | null = null
  ): Promise<Response<T[]>> {
    const response: Response<T[]> = await this.get<T[]>(null, isPublic, token);
    return response;
  }

  async getById(
    id: string,
    isPublic = false,
    token: string | null = null
  ): Promise<Response<T>> {
    const response: Response<T> = await this.get<T>(id, isPublic, token);
    return response;
  }

  async create(
    data: ResponseObjectData,
    isPublic = false,
    token: string | null = null
  ): Promise<Response<T>> {
    const response: Response<T> = await this.post<T>(data, isPublic, token);
    return response;
  }

  async update(
    id: string,
    data: ResponseObjectData,
    isPublic = false,
    token: string | null = null
  ): Promise<Response<T>> {
    const response: Response<T> = await this.put<T>(id, data, isPublic, token);
    return response;
  }

  async updatePatch(
    id: string,
    data: ResponseObjectData,
    isPublic = false,
    token: string | null = null
  ): Promise<Response<T>> {
    const response: Response<T> = await this.patch<T>(
      id,
      data,
      isPublic,
      token
    );
    return response;
  }

  async remove(id: string, isPublic = false, token = ''): Promise<Response<T>> {
    const response: Response<T> = await this.delete<T>(id, isPublic, token);
    return response;
  }
}
