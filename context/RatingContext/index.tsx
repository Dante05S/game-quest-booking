import { type RatingModel } from '@/models/Rating';
import { createContext } from 'react';

export interface Ratingtate {
  comment: string;
  handleComment: (newComment: string) => void;
  score: number | null;
  handleScore: (newScore: number) => void;
  eventId: string;
  rates: RatingModel[];
  handleRates: (newRates: RatingModel[]) => void;
}

export const initState: Ratingtate = {
  comment: '',
  score: null,
  handleComment: () => {},
  handleScore: () => {},
  eventId: '',
  rates: [],
  handleRates: () => {}
};
export const RatingContext = createContext<Ratingtate>(initState);
