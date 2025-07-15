import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';
import classNames from 'classnames';

import Heading from './Heading';
import Leading from './Leading';
import Paragraph from './Paragraph';
import Link from '!/app/misc/Link';

import '!/styles/components/elements/Content.css';

interface ContentProps {
	rootKey: string;
	className?: string;
}

const Content = ({ rootKey, className = '' }: ContentProps) => {
	const { pageId } = useRouter();
	const { t, i18n } = useTranslation(pageId);

	const headingExists = i18n.exists(`${rootKey}.heading`, {
		ns: pageId,
	});
	const leadingExists = i18n.exists(`${rootKey}.leading`, {
		ns: pageId,
	});
	const paragraphsExists = i18n.exists(`${rootKey}.paragraphs`, {
		ns: pageId,
	});
	const links = t(`${rootKey}.links`, {
		returnObjects: true,
		defaultValue: [],
	}) as string[];

	const transComponents: Record<string, JSX.Element> = {
		linked: <Link />,
	};

	links.forEach((link, k) => {
		transComponents[`linked${k}`] = (
			<Link
				key={`linked.${k}`}
				to={link}
			/>
		);
	});
	if (links.length > 0) transComponents.linked = transComponents.linked0;

	if (!headingExists && !leadingExists && !paragraphsExists) return null;

	return (
		<div className={classNames(['content', className])}>
			<Heading
				rootKey={`${rootKey}.heading`}
				className={classNames({
					'mb-6 lg:mb-10': leadingExists || paragraphsExists,
				})}
			/>
			<Leading
				rootKey={`${rootKey}.leading`}
				components={transComponents}
			/>
			<Paragraph
				rootKey={`${rootKey}.paragraphs`}
				components={transComponents}
			/>
		</div>
	);
};
export default Content;
