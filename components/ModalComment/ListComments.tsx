import React, { useEffect, useState } from 'react';
import Avatar from '../Display/Avatar';
import { reatingStyles } from '@/utils/ratingStyles';
import RatingService from '@/services/RatingService';
import useRating from '@/hooks/useRating';
import { type RatingModel } from '@/models/Rating';
import { responseIsOk } from '@/helpers/request';
import useAlertControl from '@/hooks/userAlertControl';
import { Rating } from '@smastrom/react-rating';
import Loading from '../Loaders/Loading';

interface CommentProps {
  rate: RatingModel;
}

function Comment({ rate }: CommentProps): React.JSX.Element {
  return (
    <div className="flex gap-3">
      <Avatar size={40}>{rate.user.first_name.charAt(0)}</Avatar>
      <div className="flex flex-col">
        <p>{`${rate.user.first_name} ${rate.user.last_name}`}</p>
        {rate.score !== null && (
          <div className="mt-1">
            <Rating
              style={{ maxWidth: 50 }}
              value={rate.score}
              isDisabled
              itemStyles={reatingStyles}
            />
          </div>
        )}
        {rate.comment.length > 0 && (
          <p className="text-xs mt-1">{rate.comment}</p>
        )}
      </div>
    </div>
  );
}

export default function ListComments(): React.JSX.Element {
  const { openAlert } = useAlertControl();
  const { rates, handleRates } = useRating();
  const { eventId } = useRating();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRates = async (): Promise<void> => {
    setLoading(true);
    const rateService = new RatingService();
    const response = await rateService.getAllByEvent(eventId);
    if (!responseIsOk(response.success, response.data)) {
      openAlert('error', response.errors);
    }
    handleRates(response.data!);
    setLoading(false);
  };

  useEffect(() => {
    void fetchRates();
  }, []);

  return (
    <div className="flex flex-col gap-8 text-left py-4">
      {loading ? (
        <Loading />
      ) : (
        <>
          {rates.length === 0 ? (
            <>
              <div className="h-14 px-2">
                <h4 className="font-semibold text-center text-slate-400 text-lg">
                  Se la primera persona en dar un comentario💜
                </h4>
              </div>
            </>
          ) : (
            <>
              {rates.map((rate) => (
                <Comment key={rate.id} rate={rate} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}
