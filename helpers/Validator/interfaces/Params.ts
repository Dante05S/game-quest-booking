export interface ParamsSelectOf {
  arrayValues: string[] | [boolean];
}

export interface ParamsMin {
  length: number;
}

export const defaultMin: ParamsMin = {
  length: 0
};

export interface ParamsMatch {
  field: string;
}

export const defaultMacth: ParamsMatch = {
  field: ''
};
