"use client";

import { SolidBtn } from "@/components/elements";
import { LogOut, Plus } from "lucide-react";
import { useDashboardHeader } from "./hook";
import { CreateChamberModal } from "@/components/modals/create-chamber-modal";
import { InviteModal } from "@/components/modals/invite-modal";

const DashboardHeader = () => {
	const {
		onLogoutClick,
		isCreateChamberModalOpen,
		toggleCreateChamber,
		updateInviteLink,
		isInviteLinkModalOpen,
		toggleInviteLinkModal,
		inviteLink,
	} = useDashboardHeader();

	return (
		<div className="w-full flex items-center justify-between mt-5 px-4">
			<SolidBtn
				title="Create Channel"
				className="w-fit border border-white bg-black text-white rounded-md hover:bg-primary-dark"
				titleClassName="text-white"
				LeftIcon={Plus}
				onClick={toggleCreateChamber}
			/>

			<SolidBtn
				title=""
				className="w-fit rounded-md p-2"
				LeftIcon={LogOut}
				leftIconClassName="mr-0"
				onClick={onLogoutClick}
			/>

			<CreateChamberModal
				title="Create a Chamber"
				isModalOpen={isCreateChamberModalOpen}
				onModalCloseRequest={toggleCreateChamber}
				updateInviteLink={updateInviteLink}
				toggleInviteLinkModal={toggleInviteLinkModal}
			/>

			<InviteModal
				title="Your Invite"
				isModalOpen={isInviteLinkModalOpen}
				onModalCloseRequest={toggleInviteLinkModal}
				inviteLink={inviteLink}
			/>
		</div>
	);
};

export default DashboardHeader;
