"use client";

import { RecoilRoot } from "recoil";

interface Props {
	children: React.ReactNode;
}

const RecoilProvider = (props: Props) => {
	const { children } = props;

	return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilProvider;
