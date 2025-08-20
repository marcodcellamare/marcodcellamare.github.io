import useTranslationFallback from '@/hooks/useTranslationFallback';
import classNames from 'classnames';

import Link from './Link';

export type SocialType =
	| 'download'
	| 'linkedin'
	| 'github'
	| 'behance'
	| 'instagram'
	| 'music'
	| 'nonogram'
	| 'phone'
	| 'email'
	| 'location';

export interface SocialInterface {
	type: SocialType;
	highlight?: boolean;
	title: string;
	link?: string;
}

interface SocialsProps {
	className?: string;
}

const Socials = ({ className }: SocialsProps) => {
	const socials = useTranslationFallback<SocialInterface[]>('socials', []);

	if (socials.length === 0) return;

	return (
		<div className={classNames(['socials', className])}>
			<ul className='flex flex-row gap-5 md:gap-2 flex-wrap md:flex-nowrap'>
				{socials.map(
					(social, k) =>
						social?.type &&
						social?.title && (
							<li
								key={k}
								className='flex'>
								<Link
									type={social.type}
									highlight={social?.highlight}
									title={social.title}
									link={social?.link}
								/>
							</li>
						)
				)}
			</ul>
		</div>
	);
};
export default Socials;
