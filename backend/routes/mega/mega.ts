import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import _ from "lodash";
import { Storage } from "megajs";
import { type Image, ImagesResponseSchema } from "../types/awards.ts";

const email: string = import.meta.env.VITE_MEGA_EMAIL || process.env.MEGA_EMAIL;
const password: string =
	import.meta.env.VITE_MEGA_PASSWORD || process.env.MEGA_PASSWORD;
const userAgent: string =
	import.meta.env.VITE_MEGA_USER_AGENT || process.env.MEGA_USER_AGENT;
const websiteFolder: string =
	import.meta.env.VITE_MEGA_WEBSITE_FOLDER || process.env.MEGA_WEBSITE_FOLDER;
// const websiteAwardsFolder: string =
// 	import.meta.env.VITE_MEGA_WEBSITE_AWARDS_FOLDER ||
// 	process.env.MEGA_WEBSITE_AWARDS_FOLDER;

const storage = await new Storage({
	email: email,
	password: password,
	userAgent: userAgent,
}).ready;

export const megaRoute = new Hono().get("/images", async (c) => {
	const folder = c.req.query("folder");

	try {
		const awardsFolder = storage?.root?.children
			.find((item) => item?.name === websiteFolder)
			?.children?.find((item) => item?.name === folder);

		if (!awardsFolder) {
			return c.json({ message: "Awards folder not found" }, 404);
		}
		const filePromises = awardsFolder?.children?.map(async (file) => {
			try {
				if (
					!file.name ||
					file.size === undefined ||
					file.timestamp === undefined
				) {
					console.error("Missing required properties for file", file);
					return null;
				}

				const buffer = await file.downloadBuffer({});
				const base64 = buffer.toString("base64");

				const award: Image = {
					name: file.name,
					size: file.size,
					data: `data:image/jpeg;base64,${base64}`,
					timestamp: file.timestamp,
				};

				return award;
			} catch (error) {
				console.error(`Failed to download ${file.name}:`, error);
				return null;
			}
		});

		const files = await Promise.all(filePromises);

		const validFiles = _(files).compact().sortBy("name").value() as Image[];

		const validatedResponse = ImagesResponseSchema.parse(validFiles);

		return c.json(validatedResponse);
	} catch (error) {
		if (error instanceof HTTPException) {
			throw error;
		}
		console.error("Failed to process awards:", error);
		throw new HTTPException(500, {
			message: "Failed to process awards",
			cause: error,
		});
	}
});
