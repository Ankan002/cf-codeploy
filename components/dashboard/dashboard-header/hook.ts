import { authAtom } from "@/atoms";
import { useToast } from "@/components/ui/use-toast";
import { useAPIErrorHandler } from "@/hooks";
import { useLogout } from "@/services/api/auth";
import { useSetRecoilState } from "recoil";

export const useDashboardHeader = () => {
	const { logout, isLoggingOut } = useLogout();
	const setIsAuthenticated = useSetRecoilState<boolean>(authAtom);
	const { APIErrorHandler } = useAPIErrorHandler();
	const { toast } = useToast();

	const onLogoutClick = async () => {
		if (isLoggingOut) {
			toast({
				variant: "destructive",
				description: "Hold on while we log you out!!",
			});
		}

		try {
			await logout();
			setIsAuthenticated(false);
			location.replace("/login");
		} catch (error) {
			APIErrorHandler()(error);
		}
	};

	return {
		onLogoutClick,
	};
};
