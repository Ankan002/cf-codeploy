import { authAtom } from "@/atoms";
import { useToast } from "@/components/ui/use-toast";
import { useAPIErrorHandler } from "@/hooks";
import { useLogin } from "@/services/api/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

export const useLoginSection = () => {
	const { APIErrorHandler } = useAPIErrorHandler();
	const { isLoading, login } = useLogin();
	const { toast } = useToast();
	const setIsAuthenticated = useSetRecoilState<boolean>(authAtom);
	const router = useRouter();

	const loginErrorHandler = APIErrorHandler();

	const onGoogleLogin = useGoogleLogin({
		onSuccess: async (response) => {
			console.log(response.access_token);

			try {
				const { success } = await login({
					token: response.access_token,
				});

				if (!success) {
					toast({
						description: "Log in unsuccessful!!",
					});

					return;
				}

				toast({
					description: "Logged in successfully!!",
				});
				setIsAuthenticated(true);
				router.replace("/");
			} catch (error) {
				loginErrorHandler(error);
				return;
			}
		},
		onError: APIErrorHandler(),
	});

	const onLoginClick = () => {
		if (isLoading) {
			toast({
				variant: "destructive",
				description: "Hold on while we log you in!!",
			});

			return;
		}

		onGoogleLogin();
	};

	return {
		onLoginClick,
	};
};
