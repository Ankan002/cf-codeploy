import { atom } from "recoil";

export const authAtom = atom<boolean>({
	key: "authAtom",
	default: false,
});
