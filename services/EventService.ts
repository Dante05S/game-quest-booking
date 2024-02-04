import Service from './Service';
import { type IService } from '@/interfaces/service.interface';

interface IEventService extends IService<Event> {}

export default class EventService
  extends Service<Event>
  implements IEventService
{
  constructor() {
    super('event');
  }
}
