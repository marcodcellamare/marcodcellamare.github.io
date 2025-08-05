import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '@/stores/useUIStore';
import useTranslationFallback from '@/hooks/useTranslationFallback';
import classNames from 'classnames';

import Heading from './Heading';
import Leading from './Leading';
import Paragraph from './Paragraph';
import List from './List';
import Link from './Link';
import DatesInterval from '@/app/misc/DatesInterval';
import { ArrowRightIcon, PlusIcon } from 'lucide-react';

interface ContentProps {
	rootKey: string;
	sectionId?: number;
	className?: string;
}

const Content = ({ rootKey, sectionId, className }: ContentProps) => {
	const pageId = useUIStore((state) => state.pageId);
	const { i18n } = useTranslation(pageId);

	const headingExists = i18n.exists(`${rootKey}.heading`, {
		ns: pageId,
	});
	const leadingExists = i18n.exists(`${rootKey}.leading`, {
		ns: pageId,
	});
	const paragraphsExists = i18n.exists(`${rootKey}.paragraphs`, {
		ns: pageId,
	});
	const listExists = i18n.exists(`${rootKey}.list`, {
		ns: pageId,
	});

	const links = useTranslationFallback<string[]>(
		`${rootKey}.links`,
		[],
		pageId
	);

	const transComponents: Record<string, ReactNode> = {
		linked: <Link />,
		datesInterval: <DatesInterval />,
		iconPlus: <PlusIcon className='text-svg text-svg-squared' />,
		iconArrowRight: <ArrowRightIcon className='text-svg' />,
	};

	if (Array.isArray(links)) {
		links.forEach((link, k) => {
			transComponents[`linked${k}`] = (
				<Link
					key={`linked.${k}`}
					to={link}
					sectionId={sectionId}
				/>
			);
		});
		if (links.length > 0) transComponents.linked = transComponents.linked0;
	}

	if (!headingExists && !leadingExists && !paragraphsExists && !listExists)
		return null;

	return (
		<div
			className={classNames([
				'content drop-shadow-[0_0.25rem_0_--alpha(var(--color-theme-shadow)/30%)] space-y-8',
				className,
			])}>
			<Heading
				rootKey={`${rootKey}.heading`}
				extra={sectionId === 0}
				components={transComponents}
				className={classNames({
					'mb-6 lg:mb-10':
						leadingExists || paragraphsExists || listExists,
				})}
			/>
			<Leading
				rootKey={`${rootKey}.leading`}
				extra={!headingExists}
				components={transComponents}
				className={classNames({
					extra: !headingExists,
				})}
			/>
			<Paragraph
				rootKey={`${rootKey}.paragraphs`}
				components={transComponents}
				extra={!headingExists || !leadingExists}
				extra2x={!headingExists && !leadingExists}
			/>
			<List
				rootKey={`${rootKey}.list`}
				components={transComponents}
			/>
		</div>
	);
};
export default Content;
