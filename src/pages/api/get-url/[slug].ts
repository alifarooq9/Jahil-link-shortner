// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

const getUrl = async (req: NextApiRequest, res: NextApiResponse) => {
	const slug = req.query["slug"];

	if (!slug || typeof slug !== "string") {
		res.statusCode = 404;
		res.send({ success: false, message: "Use correct link" });
		return;
	}

	const slugExit = await prisma.shortner.findFirst({
		where: {
			slug,
		},
	});

	if (!slugExit) {
		res.statusCode = 404;
		res.send({ success: true, message: "No link found" });
		return;
	}

	res.setHeader("Content-Type", "application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Cache-Control",
		"s-maxage=1000000000, stale-while-revalidate"
	);

	return res.json({ success: true, result: slugExit });
};

export default getUrl;
