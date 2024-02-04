// Enums
import { MicroService } from '@/enums/micro_service.enum';

// Interfaces
import { type Response } from '@/interfaces/response.interface';
import { type ResponseObjectData } from '@/types/response_data.type';

export default class HttpRequest {
  private endpoint: string;
  private params: string;
  private microservice: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.microservice = `${process.env.NEXT_PUBLIC_API_URI ?? ''}`;
    this.params = '';
  }

  setMicroservice(microservice: MicroService): void {
    switch (microservice) {
      case MicroService.Core:
        this.microservice = `${process.env.NEXT_PUBLIC_API_URI ?? ''}`;
        break;
      case MicroService.Order:
        this.microservice = `${process.env.NEXT_PUBLIC_API_ORDER ?? ''}`;
        break;
      case MicroService.PayMent:
        this.microservice = `${process.env.NEXT_PUBLIC_API_PAYMENT ?? ''}`;
    }
  }

  setEndpoint(endpoint: string): void {
    this.endpoint = endpoint;
  }

  setParams(params: string): void {
    this.params = params;
  }

  buildUrl(id = ''): string {
    const endpoint = id !== '' ? `${this.endpoint}/${id}` : this.endpoint;
    const params = this.params !== '' ? `?${this.params}` : '';

    return `${this.microservice}/${endpoint}${params}`;
  }

  async get<T>(
    id: string | null = null,
    isPublic = false,
    token: string | null = null
  ): Promise<Response<T>> {
    try {
      let response: globalThis.Response;
      if (id != null) {
        response = await fetch(this.buildUrl(id), {
          headers: {
            'Content-Type': 'application/json',
            'api-key': isPublic
              ? process.env.NEXT_PUBLIC_FRONT_API_KEY ?? ''
              : '',
            Authorization: token !== null ? `Bearer ${token}` : ''
          }
        });
      } else {
        response = await fetch(this.buildUrl(''), {
          headers: {
            'Content-Type': 'application/json',
            'api-key': isPublic
              ? process.env.NEXT_PUBLIC_FRONT_API_KEY ?? ''
              : '',
            Authorization: token !== null ? `Bearer ${token}` : ''
          }
        });
      }
      return response.json() as unknown as Response<T>;
    } catch (err) {
      console.log(err);
      console.error(err);
      return {
        data: null,
        message: err as string,
        errors: Array(err as string),
        success: false,
        code: 500
      };
    }
  }

  async post<T>(
    data: ResponseObjectData,
    isPublic = false,
    token: string | null = null
  ): Promise<Response<T>> {
    try {
      const response: globalThis.Response = await fetch(this.buildUrl(''), {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'api-key': isPublic
            ? process.env.NEXT_PUBLIC_FRONT_API_KEY ?? ''
            : '',
          Authorization: token !== null ? `Bearer ${token}` : ''
        }
      });

      return response.json() as unknown as Response<T>;
    } catch (err) {
      console.error(err);
      return {
        data: null,
        message: err as string,
        errors: Array(err as string),
        success: false,
        code: 500
      };
    }
  }

  async put<T>(
    id: string,
    data: ResponseObjectData,
    isPublic = false,
    token: string | null = null
  ): Promise<Response<T>> {
    try {
      const response: globalThis.Response = await fetch(this.buildUrl(id), {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'api-key': isPublic
            ? process.env.NEXT_PUBLIC_FRONT_API_KEY ?? ''
            : '',
          Authorization: token !== null ? `Bearer ${token}` : ''
        }
      });

      return response.json() as unknown as Response<T>;
    } catch (err) {
      console.error(err);
      return {
        data: null,
        message: err as string,
        errors: Array(err as string),
        success: false,
        code: 500
      };
    }
  }

  async putNew<T>(
    data: ResponseObjectData,
    isPublic = false,
    token: string | null = null
  ): Promise<Response<T>> {
    try {
      const response: globalThis.Response = await fetch(this.buildUrl(), {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'api-key': isPublic
            ? process.env.NEXT_PUBLIC_FRONT_API_KEY ?? ''
            : '',
          Authorization: token !== null ? `Bearer ${token}` : ''
        }
      });

      return response.json() as unknown as Response<T>;
    } catch (err) {
      console.error(err);
      return {
        data: null,
        message: err as string,
        errors: Array(err as string),
        success: false,
        code: 500
      };
    }
  }

  async delete<T>(
    id: string | null = null,
    isPublic = false,
    token: string | null = null
  ): Promise<Response<T>> {
    try {
      const response: globalThis.Response = await fetch(
        this.buildUrl(id ?? ''),

        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'api-key': isPublic
              ? process.env.NEXT_PUBLIC_FRONT_API_KEY ?? ''
              : '',
            Authorization: token !== null ? `Bearer ${token}` : ''
          }
        }
      );
      return response.json() as unknown as Response<T>;
    } catch (err) {
      console.error(err);
      return {
        data: null,
        message: err as string,
        errors: Array(err as string),
        success: false,
        code: 500
      };
    }
  }
}
