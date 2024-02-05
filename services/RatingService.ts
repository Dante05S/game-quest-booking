import { type Response } from '@/interfaces/response.interface';
import Service from './Service';
import { type IService } from '@/interfaces/service.interface';
import { type RatingModel } from '@/models/Rating';

interface IRatingService extends IService<RatingModel> {}

export default class RatingService
  extends Service<RatingModel>
  implements IRatingService
{
  constructor() {
    super('rate');
  }

  async getAllByEvent(eventId: string): Promise<Response<RatingModel[]>> {
    this.setEndpoint(`rate/${eventId}/by-event`);
    const response: Response<RatingModel[]> = await this.getAll(true);
    return response;
  }
}
