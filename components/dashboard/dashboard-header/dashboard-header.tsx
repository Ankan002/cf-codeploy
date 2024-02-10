"use client";

import { SolidBtn } from "@/components/elements";
import { LogOut, Plus } from "lucide-react";
import { useDashboardHeader } from "./hook";

const DashboardHeader = () => {
	const { onLogoutClick } = useDashboardHeader();

	return (
		<div className="w-full flex items-center justify-between mt-5 px-4">
			<SolidBtn
				title="Create Channel"
				className="w-fit border border-white bg-black text-white rounded-md hover:bg-primary-dark"
				titleClassName="text-white"
				LeftIcon={Plus}
			/>

			<SolidBtn
				title=""
				className="w-fit rounded-md p-2"
				LeftIcon={LogOut}
				leftIconClassName="mr-0"
				onClick={onLogoutClick}
			/>
		</div>
	);
};

export default DashboardHeader;
