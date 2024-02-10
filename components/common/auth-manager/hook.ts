import { appLoadAtom, authAtom, chambersAtom } from "@/atoms";
import { chambersLoadingAtom } from "@/atoms/chambers-loading-atom";
import { useAPIErrorHandler } from "@/hooks";
import { useCheckPrevAuth } from "@/services/api/auth";
import { useGetChambers } from "@/services/api/chambers";
import { Chamber } from "@/types/models";
import { useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export const useAuthManager = () => {
	const isAppMounted = useRef<boolean>(false);
	const setIsAppLoaded = useSetRecoilState<boolean>(appLoadAtom);
	const { checkPrevAuth, checkPrevAuthError, data } = useCheckPrevAuth();
	const [isAuthenticated, setIsAuthenticated] =
		useRecoilState<boolean>(authAtom);
	const { chambers, fetchingChamberError, getChambers, gettingChambers } =
		useGetChambers();
	const setFetchingChambers = useSetRecoilState<boolean>(chambersLoadingAtom);
	const setChambers = useSetRecoilState<Array<Chamber>>(chambersAtom);
	const { APIErrorHandler, protectedAPIErrorHandler } = useAPIErrorHandler();

	useEffect(() => {
		if (isAppMounted.current) return;
		isAppMounted.current = true;

		checkPrevAuth();
	}, []);

	useEffect(() => {
		setFetchingChambers(gettingChambers);
	}, [gettingChambers]);

	useEffect(() => {
		if (chambers) {
			console.log(chambers);
			setChambers(chambers);
		}
	}, [chambers]);

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

		if (fetchingChamberError) {
			protectedAPIErrorHandler()(fetchingChamberError);
		}
	}, [checkPrevAuthError, fetchingChamberError]);

	useEffect(() => {
		if (isAuthenticated) {
			getChambers();
		}
	}, [isAuthenticated]);

	useEffect(() => {}, []);

	return {};
};
