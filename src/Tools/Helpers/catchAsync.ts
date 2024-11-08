//? Название Generic-ов выдал по первой букве слова ?\\

type AsyncFunction<AF> = () => Promise<AF>;

interface ICatchAsync<ICA> {
  onSuccess: (result: ICA) => ICA;
  onError: (error: Error) => void;
}

const catchAsync = async <CA>(
  fn: AsyncFunction<CA>,
  { onSuccess, onError }: ICatchAsync<CA>,
): Promise<CA | null> => {
  try {
    const result = await fn();
    if (result) onSuccess(result);
    return result;
  } catch (err) {
    const error = err as Error;
    onError(error);
    return null;
  }
};

export { catchAsync };
