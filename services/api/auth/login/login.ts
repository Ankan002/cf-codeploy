import { useMutation } from "@tanstack/react-query";

interface Args {
	token: string;
}

const login = async (args: Args) => {
	const { token } = args;

	try {
		const response = await fetch(
			`${process.env["NEXT_PUBLIC_API_ENDPOINT"]}/user/login`,
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					token,
				}),
				credentials: "include",
			}
		);

		const data = await response.json();

		if (data.message && !data.access_token) {
			throw new Error(data.message);
		}

		return {
			success: true,
		};
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}

		throw new Error("Something went wrong!!");
	}
};

export const useLogin = () => {
	const { mutateAsync, isPending, data } = useMutation({
		mutationKey: ["login"],
		mutationFn: login,
	});

	return {
		login: mutateAsync,
		isLoading: isPending,
		loginData: data,
	};
};
