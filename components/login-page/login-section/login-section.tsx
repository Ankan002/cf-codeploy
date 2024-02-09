"use client";

import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import { SolidBtn } from "@/components/elements";
import { FaGoogle } from "react-icons/fa";
import { useLoginSection } from "./hook";

const LoginSection = () => {
	const { onLoginClick } = useLoginSection();

	return (
		<div className="flex-1 h-screen flex flex-col items-center justify-center px-3 py-2">
			<Image
				src={Logo.src}
				width={Logo.width}
				height={Logo.height}
				alt="Main Logo"
				className="w-72 h-24 object-contain"
			/>

			<p className="w-full max-w-[7000px] text-center bg-clip-text text-transparent bg-gradient-to-r from-primary-violet via-rose-pink to-dark-pink text-xl font-bold font-geist-mono tracking-widest">
				GET READY TO CODE
			</p>

			<SolidBtn
				title="Continue with Google"
				className="w-fit mt-6 font-geist-sans tracking-wide text-lg rounded-md hover:bg-white/90"
				LeftIcon={FaGoogle}
				leftIconClassName="mr-2.5"
				onClick={onLoginClick}
			/>
		</div>
	);
};

export default LoginSection;
