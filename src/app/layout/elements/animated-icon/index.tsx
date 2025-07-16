import { useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';
import classNames from 'classnames';

import { HandMetalIcon } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

type IconType = 'HELLO' | string;

interface IconProps {
	type: IconType;
	className?: string;
}

interface AnimatedIconProps {
	rootKey: string;
	className?: string;
}

const Icon = ({ type, className }: IconProps) => {
	const props = {
		className,
	};
	switch (type) {
		case 'HELLO':
			return <HandMetalIcon {...props} />;
	}
	return <Fragment />;
};

const AnimatedIcon = ({ rootKey, className = '' }: AnimatedIconProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);

	const iconExists = i18n.exists(rootKey, {
		ns: pageId,
	});
	const icon = t(rootKey) as IconType;

	if (!iconExists) return null;

	return (
		<div className={classNames(['animated-icon relative', className])}>
			<Icon
				type={icon}
				className='flex-1 h-full stroke-[0.5]'
			/>
		</div>
	);
};
export default AnimatedIcon;
