import { authAtom } from "@/atoms";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

type ErrorHandlerFunc = (error: Error) => void;

export const useAPIErrorHandler = () => {
	const router = useRouter();
	const setIsAuthenticated = useSetRecoilState<boolean>(authAtom);
	const { toast } = useToast();

	const protectedAPIErrorHandler =
		(customHandler?: ErrorHandlerFunc) => (error: unknown) => {
			if (error instanceof Error) {
				if (error.message === "401") {
					toast({
						variant: "destructive",
						description: "You are not authenticated!!",
					});
					setIsAuthenticated(false);
					router.replace("/login");
					return;
				}

				if (customHandler) {
					customHandler(error);
					return;
				}

				toast({
					variant: "destructive",
					description: error.message,
				});
				return;
			}

			toast({
				variant: "destructive",
				description: "Some Error Ocurred!!",
			});
		};

	const unprotectedAPIErrorHandler =
		(customHandler?: ErrorHandlerFunc) => (error: unknown) => {
			if (error instanceof Error) {
				if (error.message === "401") {
					toast({
						variant: "destructive",
						description: "You are already authenticated!!",
					});
					setIsAuthenticated(true);
					router.replace("/");
					return;
				}

				if (customHandler) {
					customHandler(error);
					return;
				}

				toast({
					variant: "destructive",
					description: error.message,
				});
				return;
			}

			toast({
				variant: "destructive",
				description: "Some Error Ocurred!!",
			});
		};

	const APIErrorHandler =
		(customHandler?: ErrorHandlerFunc) => (error: unknown) => {
			if (error instanceof Error) {
				if (customHandler) {
					customHandler(error);
					return;
				}

				toast({
					variant: "destructive",
					description: error.message,
				});
				return;
			}

			toast({
				variant: "destructive",
				description: "Some Error Ocurred!!",
			});
		};

	return {
		protectedAPIErrorHandler,
		unprotectedAPIErrorHandler,
		APIErrorHandler,
	};
};
