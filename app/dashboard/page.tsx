import { MainNavbar } from "@/components/common";
import { DashboardHeader } from "@/components/dashboard";

const DashboardPage = () => {
	return (
		<>
			<MainNavbar />
			<main className="flex min-h-screen flex-col bg-black pt-14">
				<DashboardHeader />
			</main>
		</>
	);
};

export default DashboardPage;
