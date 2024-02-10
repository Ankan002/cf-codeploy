interface Props {
	params: {
		id: string;
	};
}

const ChamberPage = (props: Props) => {
    const { params } = props;

    return <main className="flex min-h-screen flex-col bg-black pt-14"></main>;
}

export default ChamberPage;
