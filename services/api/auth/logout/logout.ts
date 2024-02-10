import { useMutation } from "@tanstack/react-query";

const logout = async () => {
	try {
		const response = await fetch(
			`${process.env["NEXT_PUBLIC_API_ENDPOINT"]}/user/logout`,
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				credentials: "include",
			}
		);

		const data = await response.json();

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

export const useLogout = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["logout"],
		mutationFn: logout,
		retry: 0,
	});

	return {
		logout: mutateAsync,
		isLoggingOut: isPending,
	};
};
