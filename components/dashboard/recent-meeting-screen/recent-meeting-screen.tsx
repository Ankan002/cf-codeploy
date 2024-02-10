import { RotateCcw } from "lucide-react";

const RecentMeetingScreen = () => {
	return (
		<div className="flex flex-col w-full mt-6 px-4">
			<div className="flex items-center text-xl text-white">
				<RotateCcw size={22} className="mr-2" />
				<h1 className="w-full text-white">Recents</h1>
			</div>
		</div>
	);
};

export default RecentMeetingScreen;
