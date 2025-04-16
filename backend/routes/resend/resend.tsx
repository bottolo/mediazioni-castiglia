import { Hono } from "hono";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(
	typeof import.meta !== "undefined" && import.meta.env
		? String(import.meta.env.VITE_RESEND_API_KEY)
		: String(process.env.RESEND_API_KEY),
);

export const resendSchema = z.object({
	fullName: z.string().min(1, "Full name is required"),
	phoneOrMail: z
		.string()
		.min(1, "Phone or email is required")
		.refine(
			(value) => {
				const phoneRegex = /^\+?[0-9\s-]+$/;
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				return phoneRegex.test(value) || emailRegex.test(value);
			},
			{
				message: "Invalid phone number or email address",
			},
		),
	description: z.string().min(1, "Description is required"),
});

export type ResendData = z.infer<typeof resendSchema>;

export const resendRoute = new Hono().post("/", async (c) => {
	try {
		const body = await c.req.parseBody();
		console.log("Received form data:", body);

		const validatedData = resendSchema.parse(body);
		console.log("Validated data:", validatedData);

		const { data, error } = await resend.emails.send({
			from: "Mediazioni Castiglia <onboarding@resend.dev>",
			to: [import.meta.env.VITE_RESEND_MAIL_TO || process.env.RESEND_MAIL_TO],
			replyTo: validatedData.phoneOrMail.includes("@")
				? validatedData.phoneOrMail
				: undefined,
			subject: "Mediazioni Castiglia: Richiesta contatto",
			html: `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: A;">
          <h2 style="color: #2c3e50;">Mediazioni Castiglia: Richiesta contatto</h2>
          <h3>Ciao Gaetano, hai ricevuto una richiesta di contatto</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            <p style="margin-bottom: 10px;"><strong>Da:</strong> ${validatedData.fullName}</p>
            <p style="margin-bottom: 10px;"><strong>Contatto:</strong> ${validatedData.phoneOrMail}</p>
            <p style="margin-bottom: 10px;"><strong>Messaggio:</strong></p>
            <p style="background-color: white; padding: 10px; border-left: 4px solid #ccc;">${validatedData.description}</p>
          </div>
        </div>
      </body>
    </html>
  `,
		});

		if (error) {
			console.error("Resend API error:", error);
			return c.json({ error: error.message }, 400);
		}

		return c.json({ success: true, data });
	} catch (error) {
		console.error("Form processing error:", error);
		if (error instanceof z.ZodError) {
			return c.json({ error: error.errors }, 400);
		}
		return c.json({ error: "Failed to process form submission" }, 500);
	}
});
