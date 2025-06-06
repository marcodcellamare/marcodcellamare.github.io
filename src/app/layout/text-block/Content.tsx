import { Trans, useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';
import classNames from 'classnames';

import '!/styles/components/text-block/Content.css';

interface ContentProps {
	sectionId: number;
	className?: string;
}

const TextBlockContent = ({ sectionId, className = '' }: ContentProps) => {
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

	return (
		<div className={classNames(['text-block-content', className])}>
			{leadingExists && (
				<p className='leading'>
					<Trans
						ns={pageId}
						i18nKey={`sections.${sectionId}.content.leading`}
						components={{
							link: <div className='underline text-5xl' />,
						}}
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
							components={{
								link: <div className='underline text-5xl' />,
							}}
						/>
					</p>
				))}
		</div>
	);
};
export default TextBlockContent;
