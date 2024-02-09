import { authAtom } from "@/atoms";
import { toggleBooleanState } from "@/utils";
import { useState } from "react";
import { useRecoilValue } from "recoil";

export const useNavbar = () => {
	const isAuthenticated = useRecoilValue<boolean>(authAtom);

	return {
		isAuthenticated,
	};
};
