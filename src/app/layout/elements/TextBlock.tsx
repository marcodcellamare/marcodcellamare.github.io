import { useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';
import { useSection } from '!/contexts/section';
import classNames from 'classnames';

import Heading from './Heading';
import Content from './Content';

interface ContentProps {
	className?: string;
}

const TextBlock = ({ className = '' }: ContentProps) => {
	const { pageId } = useRouter();
	const { i18n } = useTranslation(pageId);
	const { sectionId } = useSection();

	const contentExists = i18n.exists(`sections.${sectionId}.content`, {
		ns: pageId,
	});

	return (
		<div className={classNames(['text-block origin-left', className])}>
			<Heading
				className={classNames({
					'mb-6 lg:mb-10': contentExists,
				})}
			/>
			<Content />
		</div>
	);
};
export default TextBlock;
