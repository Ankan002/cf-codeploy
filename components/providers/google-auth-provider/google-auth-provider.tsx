"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

interface Props {
	children: React.ReactNode;
}

const GoogleAuthProvider = (props: Props) => {
	const { children } = props;

	return (
		<GoogleOAuthProvider
			clientId={process.env["NEXT_PUBLIC_GOOGLE_CLIENT_ID"] ?? ""}
		>
			{children}
		</GoogleOAuthProvider>
	);
};

export default GoogleAuthProvider;
