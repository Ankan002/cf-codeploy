import LoginHero from "@/assets/images/login/login-hero.png";
import Image from "next/image";

const LoginPage = () => {
	return (
		<main className="flex h-screen w-full bg-black">
			<div className="w-1/2 h-screen md:flex md:flex-col hidden items-center justify-center">
				<Image
					src={LoginHero.src}
					height={LoginHero.height}
					width={LoginHero.width}
					alt="Login Hero"
					className="h-full w-full object-cover"
				/>
			</div>
		</main>
	);
};

export default LoginPage;
