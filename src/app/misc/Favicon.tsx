import { useEffect, useState } from 'react';
import { cssVariable } from '@/utils/misc';

import { CircleUserIcon } from 'lucide-react';

const Favicon = () => {
	const [href, setHref] = useState<string | null>(null);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		let isMounted = true;

		const generate = async () => {
			const { renderToStaticMarkup } = await import('react-dom/server');

			const svgString = renderToStaticMarkup(
				<CircleUserIcon
					size={24}
					color={cssVariable('--color-palette-red')}
				/>
			);
			if (isMounted)
				setHref(`data:image/svg+xml,${encodeURIComponent(svgString)}`);
		};
		generate();

		return () => {
			isMounted = false;
		};
	}, []);

	if (!href) return null;

	return (
		<link
			rel='icon'
			href={href}
		/>
	);
};

export default Favicon;
