export type ResponseObjectData = Record<string, unknown>;

export type ResponseData<T = ResponseObjectData[] | ResponseObjectData | null> =
  T;
