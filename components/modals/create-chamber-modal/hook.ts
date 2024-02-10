import { chambersAtom } from "@/atoms";
import { useToast } from "@/components/ui/use-toast";
import { useAPIErrorHandler } from "@/hooks";
import { useCreateChamber } from "@/services/api/chambers";
import { Chamber } from "@/types/models";
import { textInputController } from "@/utils/text-input-controller";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

export const useCreateChamberModal = () => {
	const [name, setName] = useState<string>("");
	const [currentEmail, setCurrentEmail] = useState<string>("");
	const [emailsInvited, setEmailsInvited] = useState<Array<string>>([]);
	const { createChamber, isCreatingChamber } = useCreateChamber();
	const { protectedAPIErrorHandler } = useAPIErrorHandler();
	const setChambers = useSetRecoilState<Array<Chamber>>(chambersAtom);
	const { toast } = useToast();

	const onInviteClick = () => {
		setEmailsInvited((prev) => [...prev, currentEmail]);
		setCurrentEmail("");
	};

	const onCreateClick = async () => {
		if (isCreatingChamber) {
			toast({
				variant: "destructive",
				description: "Hold on while we create...",
			});
			return;
		}

		try {
			const data = await createChamber({
				name,
				whitelistedEmails: emailsInvited,
			});

			console.log(data);

			setChambers((prev) => [data, ...prev]);
		} catch (error) {
			protectedAPIErrorHandler()(error);
		}
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
		onCreateClick,
	};
};
