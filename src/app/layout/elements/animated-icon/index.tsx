import { useTranslation } from 'react-i18next';
import { useRouter } from '@/contexts/router';
import classNames from 'classnames';

import Wrapper, { WrapperType } from './Wrapper';

interface AnimatedIconProps {
	rootKey: string;
	className?: string;
}

const AnimatedIcon = ({ rootKey, className = '' }: AnimatedIconProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);

	const iconExists = i18n.exists(rootKey, {
		ns: pageId,
	});
	const icon = t(rootKey) as WrapperType;

	if (!iconExists) return null;

	return (
		<div className={classNames(['animated-icon relative', className])}>
			<Wrapper
				type={icon}
				className='flex-1 h-full stroke-[0.5]'
			/>
		</div>
	);
};
export default AnimatedIcon;
