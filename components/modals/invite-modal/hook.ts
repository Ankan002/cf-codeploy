import { useToast } from "@/components/ui/use-toast";

interface Args {
	link: string;
}

export const useInviteModal = (args: Args) => {
	const { link } = args;
	const { toast } = useToast();

	const copyLink = () => {
		if (typeof window !== "undefined") {
			navigator.clipboard.writeText(link);
			toast({
				variant: "default",
				description: "Link Copied!!",
			});
		}
	};

	return {
		copyLink,
	};
};
