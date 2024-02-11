import { User } from "@/types/models";
import { atom } from "recoil";

export const userAtom = atom<User | null>({
	key: "userAtom",
	default: null,
});
