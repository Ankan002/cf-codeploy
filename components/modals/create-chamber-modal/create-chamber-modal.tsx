"uce client";

import ReactModal from "react-modal";
import { useCreateChamberModal } from "./hook";
import { TextInput } from "@/components/elements";

interface Props {
	title: string;
	isModalOpen: boolean;
	onModalCloseRequest: () => void;
}

const CreateChamberModal = (props: Props) => {
	const { title, isModalOpen, onModalCloseRequest } = props;

	const { name, onNameChange } = useCreateChamberModal();

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
				<h1 className="text-xl text-white">Create Chamber</h1>

				<TextInput title="Name" value={name} onChange={onNameChange} className="mt-4" />
			</div>
		</ReactModal>
	);
};

export default CreateChamberModal;
