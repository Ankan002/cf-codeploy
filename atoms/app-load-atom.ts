import { atom } from "recoil";

export const appLoadAtom = atom<boolean>({
	key: "appLoadAtom",
	default: false,
});
