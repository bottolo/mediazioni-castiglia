import whatsapp from "@/assets/icons/whatsapp.svg";
import linkedin from "@/assets/icons/linkedin.svg";
import facebook from "@/assets/icons/facebook.svg";
import mail from "@/assets/icons/mail.svg";

export const RightSection = () => {
	return (
		<>
			<div className="hidden md:flex flex-row items-center gap-2 md:w-[200px] justify-end">
				<a
					href={"https://www.linkedin.com/in/gaetano-castiglia-9b739251/"}
					className="p-1 rounded-lg hover:bg-[var(--bg-neutral-hover)] cursor-pointer"
				>
					<img className={"size-8"} alt={"linkedin"} src={linkedin} />
				</a>
				<a href={"https://www.facebook.com/mediazionicastiglia"}>
					<div className="p-1 rounded-lg hover:bg-[var(--bg-neutral-hover)] cursor-pointer">
						<img className={"size-8"} alt={"facebook"} src={facebook} />
					</div>
				</a>
				<a href={"whatsapp://send?phone=393341058956"}>
					<div className="p-1 rounded-lg hover:bg-[var(--bg-neutral-hover)] cursor-pointer ">
						<img className={"size-8"} alt={"whatsapp"} src={whatsapp} />
					</div>
				</a>

				<div
					className="p-1  rounded-lg hover:bg-[var(--bg-neutral-hover)] cursor-pointer"
					onClick={async (e) => {
						e.preventDefault();

						window.location.href = "mailto:gaetano.castiglia@24max.it";
					}}
				>
					<img className={"size-8"} alt={"mail"} src={mail} />
				</div>
			</div>
		</>
	);
};
