import { Chamber } from "@/types/models";
import { atom } from "recoil";

export const chambersAtom = atom<Array<Chamber>>({
	key: "chambersAtom",
	default: [],
});
