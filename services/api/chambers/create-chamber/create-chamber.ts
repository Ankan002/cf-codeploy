import { Chamber } from "@/types/models";
import { useMutation } from "@tanstack/react-query";

interface Args {
	name: string;
	whitelistedEmails: Array<string>;
}

const createChamber = async (args: Args) => {
	const { name, whitelistedEmails } = args;

	try {
		const response = await fetch(
			`${process.env["NEXT_PUBLIC_API_ENDPOINT"]}/chamber/create`,
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					name,
					emails: whitelistedEmails,
				}),
				credentials: "include",
			}
		);

		if (response.status >= 400) {
			throw new Error("Something went wrong!!");
		}

		const data = await response.json();

		return data as Chamber;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}

		throw new Error("Something went wrong!!");
	}
};

export const useCreateChamber = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["create-chamber"],
		mutationFn: createChamber,
	});

	return {
		createChamber: mutateAsync,
		isCreatingChamber: isPending,
	};
};
