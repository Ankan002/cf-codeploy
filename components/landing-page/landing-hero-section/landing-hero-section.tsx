import { SolidBtn } from "@/components/elements";

const LandingHeroSection = () => {
	return (
		<div className="w-full py-14 px-3 flex flex-col items-center justify-center font-geist-sans">
			<p className="w-full max-w-[7000px] text-center bg-clip-text text-transparent bg-gradient-to-r from-primary-violet via-rose-pink to-dark-pink lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-bold">
				Live Coding Collaboration
			</p>
			<p className="w-full max-w-[7000px] text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-hue to-primary-blue lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-bold mt-3">
				Real-time interviewing
			</p>

			<p className="w-full max-w-[550px] mt-10 md:text-xl sm:text-lg text-base text-white text-center">
				Experience the power of shared coding with our innovative
				platform. Connect with others, share ideas, and build amazing
				projects together.
			</p>

			<SolidBtn
				title="Get Started"
				className="w-fit px-5 py-2 rounded-md mt-6"
			/>
		</div>
	);
};

export default LandingHeroSection;
