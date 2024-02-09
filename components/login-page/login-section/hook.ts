import { useAPIErrorHandler } from "@/hooks";
import { useGoogleLogin } from "@react-oauth/google";

export const useLoginSection = () => {
	const { APIErrorHandler } = useAPIErrorHandler();

	const onGoogleLogin = useGoogleLogin({
		onSuccess: (response) => {
			console.log(response.access_token);
		},
		onError: APIErrorHandler(),
	});

	const onLoginClick = () => {
		onGoogleLogin();
	};

	return {
		onLoginClick,
	};
};
