import { type ResponseCode } from '@/enums/response_code';
import { type ResponseData } from '@/types/response_data.type';

export interface Response<T> {
  data: ResponseData<T> | null;
  code: ResponseCode;
  message: string;
  errors: string[];
  success: boolean;
}
