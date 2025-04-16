import { z } from "zod";

export const ImageSchema = z.object({
	name: z.string(),
	size: z.number(),
	data: z.string().startsWith("data:image/jpeg;base64,"),
	timestamp: z.number(),
});

export const ImagesResponseSchema = z.array(ImageSchema);

export type Image = z.infer<typeof ImageSchema>;
export type ImagesResponse = z.infer<typeof ImagesResponseSchema>;
