import { MainNavbar } from "@/components/common";
import { DashboardHeader, RecentMeetingScreen } from "@/components/dashboard";

const DashboardPage = () => {
	return (
		<>
			<MainNavbar />
			<main className="flex min-h-screen flex-col bg-black pt-14">
				<DashboardHeader />
				<RecentMeetingScreen />
			</main>
		</>
	);
};

export default DashboardPage;
