export const textInputController =
	(setState: React.Dispatch<React.SetStateAction<string>>) =>
	(e: React.ChangeEvent<HTMLInputElement>) =>
		setState(e.target.value);
