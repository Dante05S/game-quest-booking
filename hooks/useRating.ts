import { RatingContext, type Ratingtate } from '@/context/RatingContext';
import { useContext } from 'react';

export default function useRating(): Ratingtate {
  return useContext(RatingContext);
}
