import { useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';
import classNames from 'classnames';

import '!/styles/components/text-block/Heading.css';

interface ContentProps {
	sectionId: number;
	className?: string;
}

const TextBlockHeading = ({ sectionId, className = '' }: ContentProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);

	const headingExists = i18n.exists(`sections.${sectionId}.heading`, {
		ns: pageId,
	});
	const headlineExists = i18n.exists(
		`sections.${sectionId}.heading.headline`,
		{ ns: pageId }
	);
	const subtitleExists = i18n.exists(
		`sections.${sectionId}.heading.subtitle`,
		{ ns: pageId }
	);

	if (!headingExists) return null;

	return (
		<div className={classNames(['text-block-heading', className])}>
			{headlineExists && (
				<span
					className={classNames([
						sectionId === 0 ? 'h2' : 'h5',
						'font-black uppercase text-theme-heading',
					])}>
					{t(`sections.${sectionId}.heading.headline`)}
				</span>
			)}
			<h2
				className={classNames([
					'h1 font-black uppercase text-theme-heading',
					{
						'h1-lg': sectionId === 0,
					},
				])}>
				{t(`sections.${sectionId}.heading.title`)}
			</h2>
			{subtitleExists && (
				<h3
					className={classNames([
						sectionId === 0 ? 'h3' : 'h4',
						'uppercase text-theme-heading',
					])}>
					{t(`sections.${sectionId}.heading.subtitle`)}
				</h3>
			)}
		</div>
	);
};
export default TextBlockHeading;
