import { type ParamsMin } from '../interfaces/Params';
import { type Options } from './Options';

type WithParams = 'min' | 'match';

interface WithOutParams {
  validation: Exclude<Options, WithParams>;
  helperText: string;
}

interface MinParams {
  validation: 'min';
  params: ParamsMin;
  helperText: string;
}

export type ValidationSchema = WithOutParams | MinParams;
