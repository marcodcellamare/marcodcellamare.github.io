import { useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';
import classNames from 'classnames';

import Heading from './Heading';
import Leading from './Leading';
import Paragraph from './Paragraph';
import Link from '!/app/misc/Link';
import Floating from '!/app/misc/Floating';

import '!/styles/components/elements/Content.css';

interface ContentProps {
	rootKey: string;
	className?: string;
}

const Content = ({ rootKey, className = '' }: ContentProps) => {
	const { pageId } = useRouter();
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

	const transComponents = {
		linked: <Link />,
	};

	if (!headingExists && !leadingExists && !paragraphsExists) return null;

	return (
		<div
			className={classNames(['content perspective-midrange', className])}>
			<Floating
				mode='repel'
				ratioY={30}
				changePerspective={true}
				maxRotation={20}
				duration={0.5}
				className='content-wrapper relative'>
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
			</Floating>
		</div>
	);
};
export default Content;
