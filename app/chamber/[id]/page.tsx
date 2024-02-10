"use client";
import getSocket from "@/utils/getsocket";
import Editor from "@/components/chamber/editor";
import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
interface Props {
	params: {
		id: string;
	};
}

const ChamberPage = (props: Props) => {
	const { params } = props;
	const socketRef = useRef<Socket | null>(null);
	const socketState = useRef<boolean>(false);
	useEffect(() => {
		if (!socketState.current)
			{
				socketState.current = true;
				console.log("Creating socket")
				socketRef.current = getSocket();
			}
	}, []);
	return (
		<main className="flex min-h-screen flex-col bg-black pt-14">
			<Editor socket={socketRef.current}roomId={params.id} />
		</main>
	);
};

export default ChamberPage;
