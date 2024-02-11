import { appLoadAtom, authAtom, chambersAtom, userAtom } from "@/atoms";
import { chambersLoadingAtom } from "@/atoms/chambers-loading-atom";
import { useAPIErrorHandler } from "@/hooks";
import { useCheckPrevAuth } from "@/services/api/auth";
import { useGetChambers } from "@/services/api/chambers";
import { useGetCurrentUser } from "@/services/api/user";
import { Chamber, User } from "@/types/models";
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
	const { currentUser, error, getCurrentUser } = useGetCurrentUser();
	const setFetchingChambers = useSetRecoilState<boolean>(chambersLoadingAtom);
	const setChambers = useSetRecoilState<Array<Chamber>>(chambersAtom);
	const setUser = useSetRecoilState<User | null>(userAtom);
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
			setChambers(chambers);
		}
	}, [chambers]);

	useEffect(() => {
		if (currentUser) {
			console.log(currentUser);
			setUser(currentUser);
		}
	}, [currentUser]);

	useEffect(() => {
		if (data) {
			setIsAuthenticated(data.success);
			setIsAppLoaded(true);
		}
	}, [data]);

	useEffect(() => {
		if (checkPrevAuthError) {
			APIErrorHandler()(checkPrevAuthError);
		}

		if (fetchingChamberError || error) {
			protectedAPIErrorHandler()(fetchingChamberError);
		}
	}, [checkPrevAuthError, fetchingChamberError, error]);

	useEffect(() => {
		if (isAuthenticated) {
			getChambers();
			getCurrentUser();
		}
	}, [isAuthenticated]);

	useEffect(() => {}, []);

	return {};
};
