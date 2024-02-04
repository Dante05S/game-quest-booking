import { type Booking } from '@/models/Booking';
import Service from './Service';
import { type IService } from '@/interfaces/service.interface';
import { type Response } from '@/interfaces/response.interface';

interface IBookingService extends IService<Booking> {
  getAllByUser: (token: string) => Promise<Response<Booking[]>>;
  cancel: (id: string, token: string) => Promise<Response<Booking>>;
}

export default class BookingService
  extends Service<Booking>
  implements IBookingService
{
  constructor() {
    super('booking');
  }

  async getAllByUser(token: string): Promise<Response<Booking[]>> {
    this.setEndpoint('booking/by-user');
    const response: Response<Booking[]> = await this.getAll(false, token);
    return response;
  }

  async cancel(id: string, token: string): Promise<Response<Booking>> {
    this.setEndpoint(`booking/${id}/cancel`);
    const response: Response<Booking> = await this.updatePatch(
      '',
      {},
      false,
      token
    );
    return response;
  }
}
