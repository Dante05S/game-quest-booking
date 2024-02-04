/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { type FormControlState } from '@/context/FormControlContext';

export default function getFormControlState(
  props: any,
  states: Array<keyof FormControlState>,
  muiFormControl: FormControlState | undefined
): FormControlState {
  return states.reduce((acc: FormControlState, state): FormControlState => {
    acc[state] = props[state];

    if (muiFormControl !== undefined) {
      if (typeof props[state] === 'undefined') {
        acc[state] = muiFormControl[state];
      }
    }
    return acc;
  }, {});
}
