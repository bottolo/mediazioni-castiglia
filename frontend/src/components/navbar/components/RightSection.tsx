import whatsapp from "@/assets/icons/whatsapp.svg";
import linkedin from "@/assets/icons/linkedin.svg";
import facebook from "@/assets/icons/facebook.svg";
import mail from "@/assets/icons/mail.svg";
import { Button } from "@/components/Button";
import paperplane from "@/assets/icons/paperplane.svg";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { ContactForm } from "@/components/ContactForm.tsx";
import { useState } from "react";

export const RightSection = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	return (
		<div className={"hidden md:flex flex-row gap-3"}>
			<div className="hidden md:flex flex-row items-center gap-2 justify-end">
				<a
					href={"https://www.linkedin.com/in/gaetano-castiglia-9b739251/"}
					className="p-1 rounded-lg hover:bg-[var(--bg-neutral-hover)] cursor-pointer transition-colors ease-in-out duration-150"
				>
					<img className={"size-8"} alt={"linkedin"} src={linkedin} />
				</a>
				<a href={"https://www.facebook.com/mediazionicastiglia"}>
					<div className="p-1 rounded-lg hover:bg-[var(--bg-neutral-hover)] cursor-pointer transition-colors ease-in-out duration-150">
						<img className={"size-8"} alt={"facebook"} src={facebook} />
					</div>
				</a>
				<a href={"whatsapp://send?phone=393341058956"}>
					<div className="p-1 rounded-lg hover:bg-[var(--bg-neutral-hover)] cursor-pointer transition-colors ease-in-out duration-150">
						<img className={"size-8"} alt={"whatsapp"} src={whatsapp} />
					</div>
				</a>

				<div
					className="p-1  rounded-lg hover:bg-[var(--bg-neutral-hover)] cursor-pointer transition-colors ease-in-out duration-150"
					onClick={async (e) => {
						e.preventDefault();

						window.location.href = "mailto:info@mediazionicastiglia.it";
					}}
				>
					<img className={"size-8"} alt={"mail"} src={mail} />
				</div>
			</div>
			<Dialog>
				<DialogTrigger>
					<Button icon={paperplane}>Contattami</Button>
				</DialogTrigger>
				<DialogContent className={"bg-[#F2F2F2]"}>
					<DialogHeader>
						<DialogTitle className={"mb-6"}>Contattami</DialogTitle>
						<DialogDescription>
							<ContactForm onSuccess={() => setIsDialogOpen(false)} />
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};
