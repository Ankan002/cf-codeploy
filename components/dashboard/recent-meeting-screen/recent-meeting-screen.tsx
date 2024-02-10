"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, MoreVertical, RotateCcw } from "lucide-react";
import { useRecentMeetingScreen } from "./hook";

const RecentMeetingScreen = () => {
	const { isRecentMeetingsLoading, recentChambers } =
		useRecentMeetingScreen();

	return (
		<div className="flex flex-col w-full mt-6 px-4">
			<div className="flex items-center text-xl text-white">
				<RotateCcw size={22} className="mr-2" />
				<h1 className="w-full text-white">Recents</h1>
			</div>

			{isRecentMeetingsLoading ? (
				<>
					{new Array(4).fill(12).map((_, i) => (
						<Skeleton
							className="bg-dark-grey w-full h-36 rounded-md my-3"
							key={i}
						/>
					))}
				</>
			) : recentChambers.length < 1 ? (
				<div className="w-full flex flex-col items-center justify-center mt-20">
					<p className="w-full max-w-[800px] text-center text-white lg:text-4xl md:text-3xl text-2xl font-bold">
						Live Coding Collaboration
					</p>
				</div>
			) : (
				<>
					{recentChambers.map((recentChamber) => (
						<div
							key={recentChamber._id}
							className="w-full flex items-center px-4 border border-white rounded-md my-4 py-3 text-white font-geist-mono"
						>
							<ChevronRight size={22} />
							<div className="flex-1 w-full flex flex-wrap ml-5">
								<div className="flex-1 flex flex-col md:items-start items-center mx-6 min-w-[150px]">
									<p className="text-xl font-medium">
										{recentChamber.name}
									</p>

									<p className="text-lg font-base mt-2 text-light-grey">
										{recentChamber.status === "active"
											? "Ongoing"
											: `Ended at ${
													recentChamber?.endedAt?.getUTCDate() ??
													""
											  }`}
									</p>
								</div>

								<div className="flex-1 flex flex-col md:items-start items-center mx-6 min-w-[150px]">
									<p className="text-xl font-medium">
										Participants
									</p>

									<p className="text-lg font-base mt-2 text-light-grey">
										28
									</p>
								</div>

								<div className="flex-1 flex flex-col md:items-start items-center mx-6 min-w-[150px]">
									<p className="text-xl font-medium">
										Languages
									</p>

									<p className="text-lg font-base mt-2 text-light-grey">
										Go, Java, +3
									</p>
								</div>
							</div>
							<MoreVertical size={22} />
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default RecentMeetingScreen;
