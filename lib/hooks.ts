import { useEffect } from 'react';

export const useScrollLock = (lock: boolean, onlySmall: boolean = false) => {
	useEffect(() => {
		if (!lock) {
			return;
		}

		const body = document.body;
		const previousOverflow = body.style.overflow;
		const mediaQuery = onlySmall ? window.matchMedia('(max-width: 639px)') : null;

		const syncScrollLock = () => {
			body.style.overflow = mediaQuery && !mediaQuery.matches ? previousOverflow : 'hidden';
		};

		syncScrollLock();

		if (mediaQuery) {
			mediaQuery.addEventListener('change', syncScrollLock);
		}

		return () => {
			if (mediaQuery) {
				mediaQuery.removeEventListener('change', syncScrollLock);
			}

			body.style.overflow = previousOverflow;
		};
	}, [lock, onlySmall]);
};
