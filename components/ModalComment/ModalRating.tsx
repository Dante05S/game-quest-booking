import React, { useState } from 'react';
import Modal from '../Display/Modal';
import { Rating } from '@smastrom/react-rating';
import { reatingStyles } from '@/utils/ratingStyles';
import Button from '../Buttons/Button';
import useRating from '@/hooks/useRating';
import RatingService from '@/services/RatingService';
import { useSelector } from 'react-redux';
import { selectToken, selectUser } from '@/redux/slices/userSlice';
import { responseIsOk } from '@/helpers/request';
import useAlertControl from '@/hooks/userAlertControl';
import { type CreateRating } from '@/models/Rating';

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

export default function ModalRating({
  isOpen,
  toggle
}: Props): React.JSX.Element {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const { openAlert } = useAlertControl();
  const {
    score,
    handleScore,
    comment,
    eventId,
    handleComment,
    handleRates,
    rates
  } = useRating();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDecline, setLoadingDecline] = useState<boolean>(false);

  const resetRating = (): void => {
    handleComment('');
    handleScore(5);
  };

  const sendComment = async (data: CreateRating): Promise<void> => {
    const ratingService = new RatingService();
    const response = await ratingService.create(data, false, token);

    if (!responseIsOk(response.success, response.data)) {
      openAlert('error', response.errors);
      setLoading(false);
      return;
    }
    openAlert('success', ['Comentario enviado']);
    resetRating();
    handleRates([response.data!, ...rates]);
    toggle();
  };

  const accept = async (): Promise<void> => {
    setLoading(true);
    await sendComment({
      score,
      comment,
      user_id: user?.id ?? '',
      event_id: eventId
    });
    setLoading(false);
  };

  const decline = async (): Promise<void> => {
    setLoadingDecline(true);
    if (comment.trim().length === 0) {
      openAlert('error', [
        'Debes escribir un comentario o calificar tu experiencia'
      ]);
      toggle();
      setLoadingDecline(false);
      return;
    }
    await sendComment({
      score: null,
      comment,
      user_id: user?.id ?? '',
      event_id: eventId
    });
    setLoadingDecline(false);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4">
          <h4 className="font-semibold text-xl">Valora tu experiencia</h4>
        </div>
        <Rating
          style={{ maxWidth: 170 }}
          value={score ?? 5}
          onChange={handleScore}
          itemStyles={reatingStyles}
        />
        <div className="flex items-center gap-4 mt-4 mb-4">
          <div className="w-36">
            <Button
              color="primary"
              variant="rounded"
              loading={loading}
              onClick={() => {
                void accept();
              }}
            >
              Valorar
            </Button>
          </div>
          <div className="w-36">
            <Button
              color="primary"
              variant="outlined"
              loading={loadingDecline}
              onClick={() => {
                void decline();
              }}
            >
              No, gracias
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
