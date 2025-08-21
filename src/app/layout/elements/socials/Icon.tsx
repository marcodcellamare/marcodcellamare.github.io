import classNames from 'classnames';

import Behance from 'react-bootstrap-icons/dist/icons/behance';
import Github from 'react-bootstrap-icons/dist/icons/github';
import Instagram from 'react-bootstrap-icons/dist/icons/instagram';
import Linkedin from 'react-bootstrap-icons/dist/icons/linkedin';

import {
	FileTextIcon,
	Grid3X3Icon,
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

const Icon = ({ type, title, className }: IconProps) => {
	const props = {
		title,
		className: classNames(['socials-icon text-svg', className]),
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

		case 'nonogram':
			return <Grid3X3Icon {...props} />;

		case 'phone':
			return <VibrateIcon {...props} />;

		case 'email':
			return <MailIcon {...props} />;

		case 'location':
			return <MapPinIcon {...props} />;
	}
};
export default Icon;
