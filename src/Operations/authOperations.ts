import axios, { AxiosResponse } from "axios";

import { handleAsyncOperation } from "@/Tools";

interface IUserInfo {
	firstName: string;
	secondName: string;
	isAppointExam: boolean;
	email: string;
	token: string;
}

interface IUserCredentianls {
	email: string;
	password: string;
}

/**
 * TODO:
 * Помоеу это выглядит слишком сложным
 *
 * Объект в котором метод, который возвращает функцию, которая принимает объект, в котором нужна функция
 */
const authOperations = {
	login: async (
		userCredentials: IUserCredentianls,
	): Promise<IUserInfo | null> => {
		return handleAsyncOperation({
			fn: async () => {
				const { data }: AxiosResponse<IUserInfo> = await axios.post(
					"/api/auth/adminLogin",
					userCredentials,
				);
				return data;
			},
			titleError: "логина",
		});
	},
};

export { authOperations };
