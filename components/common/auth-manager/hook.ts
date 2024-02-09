import { appLoadAtom, authAtom } from "@/atoms";
import { useAPIErrorHandler } from "@/hooks";
import { useCheckPrevAuth } from "@/services/api/auth";
import { useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export const useAuthManager = () => {
	const isAppMounted = useRef<boolean>(false);
	const setIsAppLoaded = useSetRecoilState<boolean>(appLoadAtom);
	const { checkPrevAuth, checkPrevAuthError, data } = useCheckPrevAuth();
	const [isAuthenticated, setIsAuthenticated] =
		useRecoilState<boolean>(authAtom);
	const { APIErrorHandler } = useAPIErrorHandler();

	useEffect(() => {
		if (isAppMounted.current) return;
		isAppMounted.current = true;

		checkPrevAuth();
	}, []);

	useEffect(() => {
		if (data) {
            console.log(data);
			setIsAuthenticated(data.success);
			setIsAppLoaded(true);
		}
	}, [data]);

	useEffect(() => {
		if (checkPrevAuthError) {
			APIErrorHandler()(checkPrevAuthError);
		}
	}, [checkPrevAuthError]);

	useEffect(() => {
		if (isAuthenticated) {
		}
	}, [isAuthenticated]);

	return {};
};
