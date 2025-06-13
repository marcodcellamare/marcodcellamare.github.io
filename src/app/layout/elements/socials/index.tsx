import { useTranslation } from 'react-i18next';

import Link from './Link';
import classNames from 'classnames';

export type SocialType =
	| 'download'
	| 'linkedin'
	| 'github'
	| 'behance'
	| 'instagram'
	| 'music'
	| 'phone'
	| 'email';

export interface SocialInterface {
	type: SocialType;
	title: string;
	link: string;
}

interface SocialsProps {
	className?: string;
}

const Socials = ({ className = '' }: SocialsProps) => {
	const { t } = useTranslation();

	const socials = t(`socials`, {
		returnObjects: true,
		defaultValue: [],
	}) as SocialInterface[];

	return (
		<div className={classNames(['socials', className])}>
			<ul className='flex flex-row gap-1.5 md:gap-2 flex-nowrap'>
				{socials.map((social, k) => (
					<li
						key={k}
						className='flex'>
						<Link
							type={social.type}
							title={social.title}
							link={social.link}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};
export default Socials;
