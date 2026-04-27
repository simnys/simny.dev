import { useEffect, useState } from 'react';

export function useScreenBreakpoints() {
	const [isSmall, setIsSmall] = useState<boolean>(false);
	const [isMedium, setIsMedium] = useState<boolean>(false);
	const [isLarge, setIsLarge] = useState<boolean>(false);

	useEffect(() => {
		const updateScreenBreakpoints = () => {
			const screenWidth = window.innerWidth;
			setIsSmall(screenWidth < 640);
			setIsMedium(screenWidth >= 640 && screenWidth < 1024);
			setIsLarge(screenWidth >= 1024);
		};

		updateScreenBreakpoints();
		window.addEventListener('resize', updateScreenBreakpoints);

		return () => {
			window.removeEventListener('resize', updateScreenBreakpoints);
		};
	}, []);

	return { isSmall, isMedium, isLarge };
}

export const useScrollLock = (lock: boolean, onlySmall: boolean = false) => {
	const { isMedium, isLarge } = useScreenBreakpoints();

	useEffect(() => {
		if (lock) {
			document.body.style.overflow = 'hidden';
		}

		// Release lock if window width is resized past breakpoints
		if (onlySmall && (isMedium || isLarge)) {
			document.body.style.overflow = 'unset';
		}
		return () => {
			if (lock) {
				document.body.style.overflow = 'unset';
			}
		};
	}, [lock, isMedium, isLarge, onlySmall]);
};
