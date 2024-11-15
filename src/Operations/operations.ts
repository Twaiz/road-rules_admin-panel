import axios from "axios";

import { variables } from "/variables.ts";
import { authOperations } from "./authOperations";
import { authStore, generalStore, notificationStore } from "@/Stores";

axios.defaults.baseURL = variables.apiUrl;

const token = {
	set(token: string) {
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	},
	unset() {
		axios.defaults.headers.common.Authorization = undefined;
	},
};

const handleError = (error: unknown, titleText: string) => {
	if (axios.isAxiosError(error) && error.response?.data.message) {
		notificationStore.setNotification({
			type: "error",
			titleText: `Ошибка ${titleText}`,
			bodyText: error.message,
		});

		return;
		// TODO: This else clause can be omitted because previous branches break early.
	} else {
		notificationStore.setNotification({
			type: "error",
			titleText: `Ошибка ${titleText}`,
			bodyText: "Неизвестная ошибка",
		});
	}
};

const checkInternetConnection = (titleText: string) => {
	const isOnline = navigator.onLine;

	if (!isOnline) {
		notificationStore.setNotification({
			type: "error",
			titleText: `Ошибка ${titleText}`,
			bodyText: "Отсуствует интернет подключение",
		});
	}

	return isOnline;
};

const checkToken = (titleText: string) => {
	const authToken = authStore.userInfo?.token;

	if (!authToken) {
		notificationStore.setNotification({
			type: "error",
			titleText: `Ошибка ${titleText}`,
			bodyText: "Отсуствует токен",
		});
		generalStore.setIsLoading(false);
		return null;
	}

	token.set(authToken);
	return;
};

const api = {
	login: authOperations.login,
};

export { api, token, handleError, checkInternetConnection, checkToken };
