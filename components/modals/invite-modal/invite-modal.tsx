import { SolidBtn } from "@/components/elements";
import { Clipboard } from "lucide-react";
import ReactModal from "react-modal";
import { useInviteModal } from "./hook";

interface Props {
	title: string;
	isModalOpen: boolean;
	inviteLink: string;
	onModalCloseRequest: () => void;
}

const InviteModal = (props: Props) => {
	const { title, isModalOpen, inviteLink, onModalCloseRequest } = props;
	const { copyLink } = useInviteModal({
		link: inviteLink,
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
				<div className="flex flex-col items-start mt-4">
					<p className="text-sm text-white">Code</p>
					<div className="mt-1 w-full flex">
						<div className="w-full flex border border-white px-3 py-1.5 font-geist-sans text-base text-white bg-primary-dark rounded-md">
							{inviteLink}
						</div>

						<button
							className="p-2 border border-white rounded-md text-white ml-2"
							onClick={copyLink}
						>
							<Clipboard size={22} />
						</button>
					</div>
				</div>
				<div className="w-full flex items-end justify-end mt-4">
					<SolidBtn
						title="Cancel"
						className="border border-white bg-black text-white rounded-md hover:bg-black/90 w-fit py-1"
						titleClassName="text-white"
						onClick={onModalCloseRequest}
					/>

					<SolidBtn
						title="Join"
						className="border border-white bg-white text-black rounded-md w-fit py-1 ml-3"
						titleClassName="text-black"
						link={inviteLink}
						type="external"
					/>
				</div>
			</div>
		</ReactModal>
	);
};

export default InviteModal;
