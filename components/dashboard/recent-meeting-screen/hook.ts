import { chambersAtom, chambersLoadingAtom } from "@/atoms";
import { Chamber } from "@/types/models";
import { useRecoilValue } from "recoil";

export const useRecentMeetingScreen = () => {
	const isRecentMeetingsLoading =
		useRecoilValue<boolean>(chambersLoadingAtom);
	const recentChambers = useRecoilValue<Array<Chamber>>(chambersAtom);

	return {
		isRecentMeetingsLoading,
		recentChambers,
	};
};
