import { Chamber } from "@/types/models";
import { useQuery } from "@tanstack/react-query";

const getChambers = async () => {
	try {
		const response = await fetch(
			`${process.env["NEXT_PUBLIC_API_ENDPOINT"] ?? ""}/chamber`,
			{
				method: "GET",
				headers: {
					"content-type": "application/json",
				},
				credentials: "include",
			}
		);

		if (response.status === 401) {
			throw new Error("401");
		}

		const data = await response.json();

		return data as Array<Chamber>;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}

		throw new Error("Something went wrong!!");
	}
};

export const useGetChambers = () => {
	const { refetch, isLoading, error, data } = useQuery({
		queryKey: ["get-chambers"],
		queryFn: getChambers,
		retry: 0,
		enabled: false,
	});

	return {
		getChambers: refetch,
		gettingChambers: isLoading,
		fetchingChamberError: error,
		chambers: data,
	};
};
