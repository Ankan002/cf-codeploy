import { textInputController } from "@/utils/text-input-controller";
import { useState } from "react";

export const useCreateChamberModal = () => {
	const [name, setName] = useState<string>("");
	const [currentEmail, setCurrentEmail] = useState<string>("");
	const [emailsInvited, setEmailsInvited] = useState<Array<string>>([]);

	const onInviteClick = () => {
		setEmailsInvited((prev) => [...prev, currentEmail]);
		setCurrentEmail("");
	};

	return {
		name,
		onNameChange: textInputController(setName),
		currentEmail,
		onCurrentEmailChange: textInputController(setCurrentEmail),
		emailsInvited,
		onInviteClick,
		removeFromInvitedList: (i: number) =>
			setEmailsInvited((prev) => prev.filter((_, index) => index !== i)),
	};
};
