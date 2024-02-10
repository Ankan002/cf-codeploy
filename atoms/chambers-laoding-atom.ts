import { atom } from "recoil";

export const chambersLoadingAtom = atom<boolean>({
	key: "chambersLoadingAtom",
	default: false,
});
