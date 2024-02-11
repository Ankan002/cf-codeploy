"use client";
import getSocket from "@/utils/getsocket";
import Editor from "@/components/chamber/editor";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { SolidBtn } from "@/components/elements";
import { Play } from "lucide-react";
import { EditorView } from "codemirror";
interface Props {
	params: {
		id: string;
	};
}

const ChamberPage = (props: Props) => {
	const { params } = props;
	const socketRef = useRef<Socket | null>(null);
	const socketState = useRef<boolean>(false);
	const [resultState, setResultState] = useState<string>("");
	const editorRef = useRef<EditorView | null>(null);
	const [input, setInput] = useState<string>("");

	const execute = async () => {
		console.log(editorRef.current?.state);

		const response = await fetch(
			`${process.env["NEXT_PUBLIC_API_ENDPOINT"]}/chamber/${params.id}/execute`,
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					language: "cpp",
					stdInput: input,
					code: editorRef.current?.state.doc.toString(),
				}),
			}
		);

		const data = await response.json();

		console.log(data);
	};

	useEffect(() => {
		if (!socketState.current) {
			socketState.current = true;
			console.log("Creating socket");
			socketRef.current = getSocket();
		}
	}, []);
	return (
		<>
			<nav className="w-full flex justify-end items-center fixed top-0 left-0 px-4 py-1 font-geist-mono">
				<SolidBtn
					title=""
					LeftIcon={Play}
					leftIconClassName="mr-0"
					className="p-2.5 w-fit rounded-md"
					onClick={execute}
				/>
			</nav>
			<main className="flex min-h-screen flex-col bg-black pt-14">
				<Editor
					socket={socketRef.current}
					roomId={params.id}
					eRef={editorRef}
				/>
				<div className="flex-1 w-full flex justify-between">
					<div className="w-1/2 flex flex-col px-4 py-2">
						<p className="text-lg text-white">Input</p>
						<textarea
							value={input}
							onChange={(e) => setInput(e.target.value)}
							className="resize-none flex-1 w-full bg-black text-white px-3 py-2 border border-white rounded-md mt-2 outline-none"
						/>
					</div>
					<div className="w-1/2 flex flex-col px-4 py-2">
						<p className="text-lg text-white">Output</p>
						<div className="resize-none flex-1 w-full bg-black text-white px-3 py-2 border border-white rounded-md mt-2 outline-none overflow-y-auto whitespace-pre">
							{resultState}
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default ChamberPage;
