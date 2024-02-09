"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/logo.png";
import { useNavbar } from "./hook";
import { SolidBtn } from "@/components/elements";
import { User } from "lucide-react";

const MainNavbar = () => {
	const { isAuthenticated } = useNavbar();

	return (
		<div className="w-full flex items-center justify-between fixed top-0 left-0 z-30 bg-black px-4 py-1">
			<Link href="/">
				<Image
					src={Logo.src}
					height={Logo.height}
					width={Logo.width}
					alt="logo"
					className="w-32 h-12 object-contain"
				/>
			</Link>

			<div className="w-full flex items-center justify-end">
				{isAuthenticated ? (
					<Link href="/profile">
						<button className="p-2 bg-white hover:bg-white/90s rounded-full">
							<User size={20} />
						</button>
					</Link>
				) : (
					<SolidBtn
						link="/login"
						className="px-4 py-1 rounded-md hover:bg-white/90"
						title="Login"
					/>
				)}
			</div>
		</div>
	);
};

export default MainNavbar;
