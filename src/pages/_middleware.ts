import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
	const slug = req.nextUrl.pathname.split("/").pop();
	console.log(slug);

	const slugFetch = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);
	console.log(slug, slugFetch);

	if (slugFetch.status === 404) {
		return NextResponse.redirect(req.nextUrl.origin);
	}

	const data = await slugFetch.json();

	if (data?.result?.url) {
		return NextResponse.redirect(data?.result?.url);
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: "/:slug",
};
