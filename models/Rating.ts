import { type User } from './User.interface';

export interface RatingModel {
  id: string;
  comment: string;
  score: number | null;
  user_id: string;
  event_id: string;
  user: User;
}

export type CreateRating = Pick<
  RatingModel,
  'comment' | 'score' | 'event_id' | 'user_id'
>;
