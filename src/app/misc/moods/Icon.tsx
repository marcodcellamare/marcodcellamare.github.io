import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import {
	ArrowRightIcon,
	BoomBoxIcon,
	HeartIcon,
	JoystickIcon,
	SquareCodeIcon,
	ThumbsDownIcon,
} from 'lucide-react';

import { MoodType } from '!/types/moods';

interface IconProps {
	type: MoodType | 'go';
	className?: string;
}

const Icon = ({ type, className = '' }: IconProps) => {
	const i18n = useTranslation();
	const props = {
		title: i18n.t(`moods.${type}`),
		className: classNames(['text-svg-inline', className]),
	};
	switch (type) {
		case 'hate':
			return <ThumbsDownIcon {...props} />;

		case 'music':
			return <BoomBoxIcon {...props} />;

		case 'play':
			return <JoystickIcon {...props} />;

		case 'code':
			return <SquareCodeIcon {...props} />;

		case 'love':
			return <HeartIcon {...props} />;

		case 'go':
			return <ArrowRightIcon {...props} />;
	}
};
export default Icon;
