import { useQuery } from "@tanstack/react-query";

const checkPrevAuth = async () => {
	try {
		const response = await fetch("/api/prev-auth-state", {
			method: "GET",
			headers: {
				"content-type": "application/json",
			},
			credentials: "include",
		});

		const data = await response.json();

		if (!data.success) {
			return {
				success: false,
			};
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

export const useCheckPrevAuth = () => {
	const { refetch, data, error, isLoading } = useQuery({
		queryKey: ["check-prev-auth"],
		queryFn: checkPrevAuth,
		enabled: false,
		retry: 0,
	});

	return {
		checkPrevAuth: refetch,
		data,
		checkPrevAuthError: error,
		isCheckingPrevAuth: isLoading,
	};
};
