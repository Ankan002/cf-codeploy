export const toggleBooleanState =
	(setState: React.Dispatch<React.SetStateAction<boolean>>) => () =>
		setState((prev) => !prev);
