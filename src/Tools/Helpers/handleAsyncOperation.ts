import { checkInternetConnection, checkToken, handleError } from '@/Operations';
import { generalStore, notificationStore } from '@/Stores';

const handleAsyncOperation = async <HAO>(
  fn: () => Promise<HAO>,
  titleError: string,
  necessaryChecks: 'token' | null = null,
): Promise<HAO | null> => {
  notificationStore.deleteNotification();

  try {
    const isOnline = checkInternetConnection(titleError);
    if (!isOnline) return null;

    if (necessaryChecks === 'token' && !checkToken(titleError)) {
      return null;
    }

    generalStore.setIsLoading(true);
    return await fn();
  } catch (error) {
    handleError(error, titleError);
    return null;
  } finally {
    generalStore.setIsLoading(false);
  }
};

export { handleAsyncOperation };
