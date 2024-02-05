import React from 'react';
import TextField from '../Inputs/TextField';
import Button from '../Buttons/Button';
import { BsSend } from 'react-icons/bs';
import useModal from '@/hooks/useModal';
import ModalRating from './ModalRating';
import useRating from '@/hooks/useRating';
import { useSelector } from 'react-redux';
import { selectToken } from '@/redux/slices/userSlice';
import { useRouter } from 'next/router';

export default function InputComment(): React.JSX.Element {
  const { comment, handleComment } = useRating();
  const token = useSelector(selectToken);
  const router = useRouter();
  const [isOpen, toggle] = useModal();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (token === null) {
      void router.push('/register');
      return;
    }
    toggle();
  };

  return (
    <>
      <div className="sticky bottom-0 w-full pb-3 flex items-center">
        <form
          autoComplete="off"
          className="flex items-center w-full"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="flex flex-grow w-full pr-3">
            <TextField
              rounded="rounded-xl"
              fontSize="text-base"
              placeholder="Escribe un comentario..."
              bgColor="bg-background"
              id="comment"
              name="comment"
              value={comment}
              onChange={(e) => {
                handleComment(e.target.value);
              }}
            />
          </div>
          <div className="min-w-[3rem] w-12 min-h-12 h-[3rem]">
            <Button type="submit" variant="rounded">
              <BsSend className="text-xl" />
            </Button>
          </div>
        </form>
      </div>
      <ModalRating isOpen={isOpen} toggle={toggle} />
    </>
  );
}
