"use client";

import { twMerge } from "tailwind-merge";

interface Props {
	title: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	titleClassName?: string;
	inputClassName?: string;
	placeholder?: string;
}

const TextInput = (props: Props) => {
	const {
		title,
		value,
		onChange,
		className,
		titleClassName,
		inputClassName,
		placeholder,
	} = props;

	return (
		<div
			className={twMerge(
				"w-full flex flex-col items-start font-geist-sans",
				className
			)}
		>
			<p className={twMerge("text-sm text-white", titleClassName)}>
				{title}
			</p>

			<input
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className={twMerge(
					"w-full mt-1.5 px-3 py-2 border outline-none border-light-grey/70 hover:border-white/70 focus:border-white bg-black text-white rounded-md",
					inputClassName
				)}
			/>
		</div>
	);
};

export default TextInput;
