import React, { MutableRefObject, useEffect, useRef } from "react";
import { basicSetup, EditorView } from "codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorState } from "@codemirror/state";
import { cpp } from "@codemirror/lang-cpp";
import { drawSelection } from "@codemirror/view";
import { peerExtension } from "./extension";
import { Socket } from "socket.io-client";
import getSocket from "@/utils/getsocket";

const fixedHeightEditor = EditorView.theme({
	"&": { height: "calc(100vh - 255px)" },
	".cm-scroller": { overflow: "auto" },
});

const Editor = ({
	socket,
	roomId,
}: {
	socket: Socket | null;
	roomId: string;
	eRef: MutableRefObject<EditorView | null>;
}) => {
	const elementRef = useRef<HTMLDivElement>(null);
	const editorRef = useRef<EditorView | null>(null);

	useEffect(() => {
		const socket = getSocket();
		socket?.emit("join", { roomId });
		socket?.emit("fetch", { roomId });
		socket?.once("pull", ({ version, code }: any) => {
			const state = EditorState.create({
				doc: code,
				extensions: [
					peerExtension(version, socket, roomId),
					EditorView.lineWrapping,
					basicSetup,
					oneDark,
					cpp(),
					fixedHeightEditor,
					drawSelection({ cursorBlinkRate: 0 }),
				],
			});
			editorRef.current = new EditorView({
				state,
				parent: elementRef.current!,
			});
		});
		return () => editorRef.current?.destroy();
	}, [elementRef, roomId, socket]);

	return <div ref={elementRef}></div>;
};

export default Editor;
