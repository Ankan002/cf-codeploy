import { textInputController } from "@/utils/text-input-controller";
import { useState } from "react";

export const useCreateChamberModal = () => {
	const [name, setName] = useState<string>("");

	return {
		name,
		onNameChange: textInputController(setName),
	};
};
