import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ResendData, resendSchema } from "@backend/routes/resend/resend";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/Button.tsx";
import { AlertCircle, CheckCircle, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { TermsOfService } from "@/components/TermsOfService.tsx";

type ContactFormProps = {
	onSuccess?: () => void;
};

const SuccessToast = () => (
	<div className="flex items-center gap-2 bg-[#F2F2F2] rounded-lg p-4 shadow-lg">
		<CheckCircle className="h-5 w-5 text-green-500" />
		<div>
			<p className="font-medium">Messaggio inviato con successo</p>
			<p className="text-sm text-gray-500">
				Verrai contattato appena possibile
			</p>
		</div>
	</div>
);

const ErrorToast = ({ message }: { message: string }) => (
	<div className="flex items-center gap-2 bg-[#F2F2F2] rounded-lg p-4 shadow-lg">
		<AlertCircle className="h-5 w-5 text-red-500" />
		<div>
			<p className="font-medium">Errore nell'invio del messaggio</p>
			<p className="text-sm text-red-500">{message}</p>
		</div>
	</div>
);

export const ContactForm = ({ onSuccess }: ContactFormProps) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<ResendData>({
		resolver: zodResolver(resendSchema),
		defaultValues: {
			fullName: "",
			phoneOrMail: "",
			description: "",
		},
		mode: "onSubmit",
	});

	const onSubmit = async (data: ResendData) => {
		setIsSubmitting(true);
		setError(null);

		try {
			const formData = new FormData();
			Object.entries(data).map(([key, value]) => {
				formData.append(key, value);
			});

			const response = await fetch("/api/resend", {
				method: "POST",
				body: formData,
			});

			const result = await response.json();

			if (!response.ok) {
				const errorMessage = result.error
					? Array.isArray(result.error)
						? result.error[0]?.message
						: result.error
					: "Failed to send message";
				throw new Error(errorMessage);
			}

			toast.custom(() => <SuccessToast />);
			form.reset();

			if (onSuccess) {
				onSuccess();
			}
		} catch (err) {
			const errorMessage =
				err instanceof Error
					? err.message
					: "Si è verificato un errore imprevisto";
			setError(errorMessage);

			toast.custom(() => <ErrorToast message={errorMessage} />);
			console.error("Form submission error:", err);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="fullName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome e cognome</FormLabel>
							<FormControl>
								<Input {...field} disabled={isSubmitting} />
							</FormControl>
							<FormMessage className="text-red-500 text-sm" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phoneOrMail"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Indirizzo e-mail o numero di telefono</FormLabel>
							<FormControl>
								<Input {...field} disabled={isSubmitting} />
							</FormControl>
							<FormMessage className="text-red-500 text-sm" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Come posso aiutarti?</FormLabel>
							<FormControl>
								<Textarea {...field} disabled={isSubmitting} />
							</FormControl>
							<FormMessage className="text-red-500 text-sm" />
						</FormItem>
					)}
				/>

				{error && <div className="text-red-500 text-sm">{error}</div>}

				<div className="flex flex-row justify-between pt-1">
					<TermsOfService />
					<Button type="submit" className="w-[100px]" disabled={isSubmitting}>
						{isSubmitting ? (
							<Loader2Icon size={22} className={"animate-spin"} />
						) : (
							<p>Invia</p>
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
};
