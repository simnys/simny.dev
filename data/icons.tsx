export function Logo(props: React.SVGAttributes<any>) {
	return (
		<svg width="70" height="70" viewBox="0 0 70 70" fill="none" {...props}>
			<path
				d="M55.552 10.7824C38.0293 -7.65475 -5.2359 8.0449 4.37654 43.3541C5.1309 46.1251 8.58862 46.8294 10.5964 44.7761L23.7125 31.3627C25.5672 29.4659 28.5804 29.3479 30.5779 31.0938L39.5531 38.9386C41.4016 40.5542 44.1496 40.5889 46.0382 39.0203L60.558 26.9613C62.6074 25.2592 65.7254 26.0145 66.3125 28.613C72.0311 53.922 40.9681 80.8186 14.2267 58.9424"
				stroke="currentColor"
				strokeWidth="6"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export function IconMenu({
	isOpen,
	...props
}: { isOpen: boolean } & React.SVGAttributes<SVGElement>) {
	return (
		<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" {...props}>
			<rect
				className={`origin-center transition-transform ease-out ${
					isOpen ? 'rotate-45' : '-translate-y-[3px]'
				}`}
				x="1"
				y="7.5"
				width="14"
				height="1.25"
				rx="0.5"
			></rect>
			<rect
				className={`origin-center transition-transform ease-out ${
					isOpen ? '-rotate-45' : 'translate-y-[3px]'
				}`}
				x="1"
				y="7.5"
				width="14"
				height="1.25"
				rx="0.5"
			></rect>
		</svg>
	);
}
