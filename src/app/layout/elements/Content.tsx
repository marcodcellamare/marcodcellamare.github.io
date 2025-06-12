import { Trans, useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';
import { useSection } from '!/contexts/section';
import classNames from 'classnames';

import Link from '!/app/misc/Link';

import '!/styles/components/elements/Content.css';

interface ContentProps {
	className?: string;
}

const Content = ({ className = '' }: ContentProps) => {
	const { sectionId } = useSection();
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);

	const leadingExists = i18n.exists(`sections.${sectionId}.content.leading`, {
		ns: pageId,
	});
	const paragraphsExists = i18n.exists(
		`sections.${sectionId}.content.paragraphs`,
		{
			ns: pageId,
		}
	);
	const paragraphs = t(`sections.${sectionId}.content.paragraphs`, {
		returnObjects: true,
		defaultValue: [],
	}) as string[];

	const transComponents = {
		linked: <Link />,
	};

	if (!leadingExists && (!paragraphsExists || paragraphs.length === 0))
		return null;

	return (
		<div className={classNames(['content', className])}>
			{leadingExists && (
				<p className='leading'>
					<Trans
						ns={pageId}
						i18nKey={`sections.${sectionId}.content.leading`}
						components={transComponents}
					/>
				</p>
			)}
			{paragraphsExists &&
				paragraphs.length > 0 &&
				paragraphs.map((_, k) => (
					<p key={k}>
						<Trans
							ns={pageId}
							i18nKey={`sections.${sectionId}.content.paragraphs.${k}`}
							components={transComponents}
						/>
					</p>
				))}
		</div>
	);
};
export default Content;
