import { type IService } from '@/interfaces/service.interface';
import { type User } from '@/models/User.interface';
import Service from './Service';

interface IUserService extends IService<User> {}

export default class UserService extends Service<User> implements IUserService {
  constructor() {
    super('user');
  }
}
