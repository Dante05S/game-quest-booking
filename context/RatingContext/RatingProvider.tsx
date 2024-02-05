import React, { useState } from 'react';
import { RatingContext } from '.';
import { type RatingModel } from '@/models/Rating';

interface Props {
  eventId: string;
  children: React.ReactNode;
}

export default function RatingProvider({
  children,
  eventId
}: Props): React.JSX.Element {
  const [comment, setComment] = useState<string>('');
  const [score, setScore] = useState<number | null>(5);
  const [rates, setRates] = useState<RatingModel[]>([]);

  const handleComment = (newComment: string): void => {
    setComment(newComment);
  };

  const handleScore = (newScore: number | null): void => {
    setScore(newScore);
  };

  const handleRates = (newRates: RatingModel[]): void => {
    setRates(newRates);
  };

  return (
    <RatingContext.Provider
      value={{
        comment,
        score,
        handleComment,
        handleScore,
        eventId,
        rates,
        handleRates
      }}
    >
      {children}
    </RatingContext.Provider>
  );
}
