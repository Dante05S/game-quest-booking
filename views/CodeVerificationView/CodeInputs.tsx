/* eslint-disable @typescript-eslint/prefer-optional-chain */
import { type RefInputElement } from '@/components/Inputs/Input';
import TextField from '@/components/Inputs/TextField';
import React, { type RefObject, useRef } from 'react';

export interface ICodeInputs {
  sms_token1: string;
  sms_token2: string;
  sms_token3: string;
  sms_token4: string;
}

interface Props {
  codeInputs: ICodeInputs;
  onChange: (newCodeInputs: ICodeInputs) => void;
}

export default function CodeInputs({
  codeInputs,
  onChange
}: Props): React.JSX.Element {
  const codeInput2 = useRef<RefInputElement>(null);
  const codeInput3 = useRef<RefInputElement>(null);
  const codeInput4 = useRef<RefInputElement>(null);

  const skipNextInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    ref: RefObject<RefInputElement> | null
  ): void => {
    if (Number(e.target.value) > 9) return;

    const value =
      e.target.value.trim().length === 0 ? '' : Number(e?.target?.value);

    onChange({
      ...codeInputs,
      [e.target.name]: value
    });

    if (
      e.target.value.trim().length > 0 &&
      ref !== null &&
      ref.current !== null &&
      ref.current.ref !== null
    ) {
      ref.current.ref.focus();
    }
  };

  return (
    <div className="mt-3 gap-2 grid grid-cols-4">
      <TextField
        id="digit1"
        type="number"
        name="sms_token1"
        value={codeInputs?.sms_token1 ?? ''}
        onChange={(e) => {
          skipNextInput(e, codeInput2);
        }}
        fontSize="text-2xl"
        styleInput="inputCode"
      />
      <TextField
        ref={codeInput2}
        id="digit2"
        type="number"
        name="sms_token2"
        value={codeInputs?.sms_token2 ?? ''}
        onChange={(e) => {
          skipNextInput(e, codeInput3);
        }}
        fontSize="text-2xl"
        styleInput="inputCode"
      />
      <TextField
        ref={codeInput3}
        id="digit3"
        type="number"
        name="sms_token3"
        value={codeInputs?.sms_token3 ?? ''}
        onChange={(e) => {
          skipNextInput(e, codeInput4);
        }}
        fontSize="text-2xl"
        styleInput="inputCode"
      />
      <TextField
        ref={codeInput4}
        id="digit4"
        type="number"
        name="sms_token4"
        value={codeInputs?.sms_token4 ?? ''}
        styleInput="inputCode"
        fontSize="text-2xl"
        onChange={(e) => {
          skipNextInput(e, null);
        }}
      />
    </div>
  );
}
