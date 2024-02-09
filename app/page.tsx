import { MainNavbar } from "@/components/common";
import { LandingHeroSection } from "@/components/landing-page";

export default function Home() {
	return (
		<>
			<MainNavbar />
			<main className="flex min-h-screen flex-col bg-black pt-14">
				<LandingHeroSection />
			</main>
		</>
	);
}
