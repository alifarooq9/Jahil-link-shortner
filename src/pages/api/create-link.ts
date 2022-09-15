import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const createLink = async (req: NextApiRequest, res: NextApiResponse) => {
	const { slug, url } = req.body;

	if (!slug || !url) {
		res.statusCode === 404;
		res.json({ success: false, message: "Body not found" });
		return;
	}

	try {
		const createLink = await prisma.shortner.create({
			data: {
				slug,
				url,
			},
		});

		res.statusCode = 201;
		res.json({
			success: true,
			message: "Link successfully created",
			data: createLink,
		});
	} catch (error) {
		res.statusCode === 500;
		console.log(error);

		res.json({ success: false, error });
	}
};

export default createLink;
