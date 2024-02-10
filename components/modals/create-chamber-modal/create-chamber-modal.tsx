"uce client";

import ReactModal from "react-modal";
import { useCreateChamberModal } from "./hook";
import { SolidBtn, TextInput } from "@/components/elements";

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

				<TextInput
					title="Name"
					value={name}
					onChange={onNameChange}
					className="mt-4"
				/>

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
						onClick={onModalCloseRequest}
					/>
				</div>
			</div>
		</ReactModal>
	);
};

export default CreateChamberModal;
