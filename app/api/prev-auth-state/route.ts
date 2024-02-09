import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
	const accessToken = request.cookies.get("accessToken")?.value;

	if (!accessToken) {
		return NextResponse.json(
			{
				success: false,
			},
			{
				status: 400,
			}
		);
	}

	return NextResponse.json(
		{
			success: true,
		},
		{
			status: 200,
		}
	);
};

export const revalidate = 0;
