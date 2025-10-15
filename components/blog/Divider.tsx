export default function Divider() {
	return (
		<div
			className="my-12 sm:my-16 flex w-full items-center justify-center gap-2"
			aria-hidden="true"
		>
			<div className="size-1.5 rounded-full bg-foreground-tertiary/30" />
			<div className="size-1.5 rounded-full bg-foreground-tertiary/30" />
			<div className="size-1.5 rounded-full bg-foreground-tertiary/30" />
			<div className="size-1.5 rounded-full bg-foreground-tertiary/30" />
		</div>
	);
}
