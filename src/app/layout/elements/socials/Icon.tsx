import classNames from 'classnames';

import { Behance, Github, Instagram, Linkedin } from 'react-bootstrap-icons';
import {
	FileTextIcon,
	MailIcon,
	MapPinIcon,
	Music4Icon,
	VibrateIcon,
} from 'lucide-react';

import { SocialType } from '.';

interface IconProps {
	type: SocialType;
	title?: string;
	className?: string;
}

const Icon = ({ type, title = '', className = '' }: IconProps) => {
	const props = {
		title,
		className: classNames(['text-svg-inline', className]),
	};
	switch (type) {
		case 'download':
			return <FileTextIcon {...props} />;

		case 'linkedin':
			return <Linkedin {...props} />;

		case 'github':
			return <Github {...props} />;

		case 'behance':
			return <Behance {...props} />;

		case 'instagram':
			return <Instagram {...props} />;

		case 'music':
			return <Music4Icon {...props} />;

		case 'phone':
			return <VibrateIcon {...props} />;

		case 'email':
			return <MailIcon {...props} />;

		case 'location':
			return <MapPinIcon {...props} />;
	}
};
export default Icon;
