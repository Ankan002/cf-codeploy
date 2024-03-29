"uce client";

import ReactModal from "react-modal";
import { useCreateChamberModal } from "./hook";
import { SolidBtn, TextInput } from "@/components/elements";
import { X } from "lucide-react";

interface Props {
	title: string;
	isModalOpen: boolean;
	onModalCloseRequest: () => void;
	updateInviteLink: (str: string) => void;
	toggleInviteLinkModal: () => void;
}

const CreateChamberModal = (props: Props) => {
	const {
		title,
		isModalOpen,
		onModalCloseRequest,
		updateInviteLink,
		toggleInviteLinkModal,
	} = props;

	const {
		name,
		onNameChange,
		currentEmail,
		onCurrentEmailChange,
		onInviteClick,
		emailsInvited,
		removeFromInvitedList,
		onCreateClick,
	} = useCreateChamberModal({
		onModalCloseRequest,
		updateInviteLink,
		toggleInviteLinkModal,
	});

	return (
		<ReactModal
			isOpen={isModalOpen}
			onRequestClose={onModalCloseRequest}
			shouldCloseOnOverlayClick={true}
			shouldCloseOnEsc={true}
			style={{
				overlay: {
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					paddingRight: "10px",
					paddingLeft: "10px",
					backgroundColor: "rgba(0, 0, 0, 0.6)",
					zIndex: 40,
				},
			}}
			className="w-full max-w-[600px] flex flex-col"
		>
			<div className="w-full flex flex-col border border-white rounded-md px-4 py-3 bg-black font-geist-sans">
				<h1 className="text-xl text-white">{title}</h1>

				<TextInput
					title="Name"
					value={name}
					onChange={onNameChange}
					className="mt-4"
				/>

				<div className="flex flex-col mt-4">
					<p className="text-sm text-white">Invited Emails</p>

					<div className="w-full flex overflow-x-auto border border-light-grey py-1 px-1 rounded-md min-h-10 mt-1">
						{emailsInvited.map((e, i) => (
							<div
								className="w-fit flex items-center px-1 py-1 rounded-md font-geist-sans bg-white mx-1 text-black"
								key={i}
							>
								<p>{e}</p>

								<button
									className="ml-1"
									onClick={() => removeFromInvitedList(i)}
								>
									<X size={16} />
								</button>
							</div>
						))}
					</div>
				</div>

				<div className="mt-4 flex items-center">
					<TextInput
						title=""
						value={currentEmail}
						onChange={onCurrentEmailChange}
						placeholder="Invited Email"
					/>

					<SolidBtn
						title="Invite"
						className="border border-white bg-white text-black rounded-md w-fit py-2 ml-3"
						titleClassName="text-black"
						onClick={onInviteClick}
					/>
				</div>

				<div className="w-full flex items-end justify-end mt-4">
					<SolidBtn
						title="Cancel"
						className="border border-white bg-black text-white rounded-md hover:bg-black/90 w-fit py-1"
						titleClassName="text-white"
						onClick={onModalCloseRequest}
					/>

					<SolidBtn
						title="Create"
						className="border border-white bg-white text-black rounded-md w-fit py-1 ml-3"
						titleClassName="text-black"
						onClick={onCreateClick}
					/>
				</div>
			</div>
		</ReactModal>
	);
};

export default CreateChamberModal;
