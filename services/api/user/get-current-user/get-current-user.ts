import { User } from "@/types/models";
import { useQuery } from "@tanstack/react-query";

const getCurrentUser = async () => {
	try {
		const response = await fetch(
			`${process.env["NEXT_PUBLIC_API_ENDPOINT"]}/user/data`,
			{
				method: "GET",
				headers: {
					"content-type": "application/json",
				},
				credentials: "include",
			}
		);

		if (response.status >= 400) {
			throw new Error("Something went wrong!!");
		}

		const data = await response.json();

		return data as User;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}

		throw new Error("Something went wrong!!");
	}
};

export const useGetCurrentUser = () => {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["get-user"],
		queryFn: getCurrentUser,
		retry: 0,
		enabled: false,
	});

	return {
		getCurrentUser: refetch,
		isGettingCurrentUser: isLoading,
		currentUser: data,
		error,
	};
};
