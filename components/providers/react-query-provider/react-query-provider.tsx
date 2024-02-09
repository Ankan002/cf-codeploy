"use client";

import { getQueryClient } from "@/utils";
import { QueryClientProvider } from "@tanstack/react-query";

interface Props {
	children: React.ReactNode;
}

const ReactQueryProvider = (props: Props) => {
	const { children } = props;

	const client = getQueryClient();

	return (
		<QueryClientProvider client={client}>{children}</QueryClientProvider>
	);
};

export default ReactQueryProvider;
