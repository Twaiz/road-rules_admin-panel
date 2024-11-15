import { checkInternetConnection, checkToken, handleError } from "@/Operations";
import { generalStore, notificationStore } from "@/Stores";

type AsyncFunction<AF> = () => Promise<AF>;
type NecessaryChecks = "token";

interface IHandleAsyncOperation<IHAO> {
	fn: AsyncFunction<IHAO>;
	titleError: string;
	necessaryChecks?: NecessaryChecks | null;
}

const handleAsyncOperation = async <HAO>(
	props: IHandleAsyncOperation<HAO>,
): Promise<HAO | null> => {
	const { fn, titleError, necessaryChecks = null } = props;

	notificationStore.deleteNotification();

	try {
		const isOnline = checkInternetConnection(titleError);
		if (!isOnline) return null;

		if (necessaryChecks === "token") {
			const tokenValid = checkToken(titleError);
			if (!tokenValid) return null;
		}

		generalStore.setIsLoading(true);

		const result = await fn();
		return result;
	} catch (error) {
		// TODO: Нет вызова generalStore.setIsLoading(false);
		handleError(error, titleError);
		return null;
	} finally {
		generalStore.setIsLoading(false);
	}
};

export { handleAsyncOperation };
