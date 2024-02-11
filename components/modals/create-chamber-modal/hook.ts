import { chambersAtom } from "@/atoms";
import { useToast } from "@/components/ui/use-toast";
import { useAPIErrorHandler } from "@/hooks";
import { useCreateChamber } from "@/services/api/chambers";
import { Chamber } from "@/types/models";
import { textInputController } from "@/utils/text-input-controller";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

interface Args {
	onModalCloseRequest: () => void;
	updateInviteLink: (str: string) => void;
	toggleInviteLinkModal: () => void;
}

export const useCreateChamberModal = (args: Args) => {
	const { onModalCloseRequest, updateInviteLink, toggleInviteLinkModal } =
		args;

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

			setChambers((prev) => [data, ...prev]);
			updateInviteLink(
				`${process.env["NEXT_PUBLIC_NEXT_URL"]}/chamber/${data._id}`
			);
			onModalCloseRequest();
			toggleInviteLinkModal();
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
