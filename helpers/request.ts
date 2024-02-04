export const responseIsOk = (
  success: boolean,
  data: any,
  acceptDataNull = false
): boolean => {
  const validateData = acceptDataNull || data !== null;

  return success && validateData;
};
