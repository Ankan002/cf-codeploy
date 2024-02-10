import { NextRequest, NextResponse } from "next/server";
import {
	protected_route_matchers,
	protected_routes,
	unprotected_routes,
} from "./constants/routes";

export const middleware = (request: NextRequest) => {
	if (!request.nextUrl.pathname.includes("/api")) {
		const pathname = request.nextUrl.pathname;
		const accessToken = request.cookies.get("accessToken")?.value;

		for (const route of unprotected_routes) {
			if (pathname === route) {
				if (accessToken) {
					return NextResponse.redirect(
						`${process.env["NEXT_URL"] ?? ""}/dashboard`
					);
				}
				return NextResponse.next();
			}
		}

		for (const matcher of protected_route_matchers) {
			if (pathname.startsWith(matcher)) {
				if (accessToken) return NextResponse.next();
				return NextResponse.redirect(
					`${process.env["NEXT_URL"] ?? ""}/login`
				);
			}
		}

		for (const route of protected_routes) {
			if (pathname === route) {
				if (accessToken) return NextResponse.next();
				return NextResponse.redirect(
					`${process.env["NEXT_URL"] ?? ""}/login`
				);
			}
		}
	}

	return NextResponse.next();
};
