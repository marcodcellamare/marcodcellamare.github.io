import { cloneElement, ReactElement, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import {
	AngryIcon,
	ArrowRightIcon,
	AudioWaveformIcon,
	BoomBoxIcon,
	CassetteTapeIcon,
	Disc3Icon,
	Gamepad2Icon,
	GamepadIcon,
	HeadphonesIcon,
	HeartIcon,
	JoystickIcon,
	KeyboardIcon,
	KeyboardMusicIcon,
	LayoutPanelTopIcon,
	Music4Icon,
	PenToolIcon,
	RulerIcon,
	SmileIcon,
	SquareCodeIcon,
	ThumbsDownIcon,
	ThumbsUpIcon,
} from 'lucide-react';

import { MoodCategoryType } from '.';

interface IconProps {
	category: MoodCategoryType | 'go';
	isVisible: boolean;
	className?: string;
}

const Icon = ({ category, isVisible = false, className = '' }: IconProps) => {
	const { t } = useTranslation();

	const [icon, setIcon] = useState<ReactElement>();

	const props = {
		title: t(`moods.${category}`),
		className: classNames(['text-svg-inline text-[140%]', className]),
	};

	const icons = useRef<Record<MoodCategoryType | 'go', ReactElement[]>>({
		love: [<HeartIcon />, <ThumbsUpIcon />, <SmileIcon />],
		hate: [<AngryIcon />, <ThumbsDownIcon />],
		listenTo: [
			<BoomBoxIcon />,
			<CassetteTapeIcon />,
			<Disc3Icon />,
			<HeadphonesIcon />,
		],
		makeMusicWith: [
			<AudioWaveformIcon />,
			<KeyboardMusicIcon />,
			<Music4Icon />,
		],
		play: [<JoystickIcon />, <GamepadIcon />, <Gamepad2Icon />],
		design: [<RulerIcon />, <LayoutPanelTopIcon />, <PenToolIcon />],
		code: [<SquareCodeIcon />, <KeyboardIcon />],
		go: [<ArrowRightIcon />],
	});

	useEffect(() => {
		const list = icons.current[category];
		const iconIdx = Math.floor(
			Math.random() * icons.current[category].length
		);
		setIcon(isVisible ? list[iconIdx] : undefined);
	}, [category, isVisible]);

	if (!icon) return null;

	return cloneElement(icon, props);
};
export default Icon;
