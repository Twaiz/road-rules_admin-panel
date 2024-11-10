import { generalStore } from '@/Stores';

type AsyncFunction<AF> = () => Promise<AF>;

const handleAsyncOperation = async <HAO>(
  fn: AsyncFunction<HAO>,
  textError: string,
): Promise<HAO | null> => {
  try {
    generalStore.setIsLoading(true);

    const result = await fn();
    return result;
  } catch (error) {
    const err = error as Error;

    console.log(textError, err); //? Позже тут будет отправка ошибки в notification store ?\\
    return null;
  } finally {
    generalStore.setIsLoading(false);
  }
};

export { handleAsyncOperation };
