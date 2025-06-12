import { useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';
import { useSection } from '!/contexts/section';
import classNames from 'classnames';

import '!/styles/components/elements/Heading.css';

interface ContentProps {
	className?: string;
}

const TextBlockHeading = ({ className = '' }: ContentProps) => {
	const { sectionId } = useSection();
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
		<div
			className={classNames([
				'heading text-[var(--color-heading)] uppercase',
				className,
			])}>
			{headlineExists && (
				<span
					className={classNames([
						sectionId === 0 ? 'h2' : 'h5',
						'font-black',
					])}>
					{t(`sections.${sectionId}.heading.headline`)}
				</span>
			)}
			<h2
				className={classNames([
					'h1 font-black',
					{
						extra: sectionId === 0,
					},
				])}>
				{t(`sections.${sectionId}.heading.title`)}
			</h2>
			{subtitleExists && (
				<h3 className={classNames([sectionId === 0 ? 'h3' : 'h4'])}>
					{t(`sections.${sectionId}.heading.subtitle`)}
				</h3>
			)}
		</div>
	);
};
export default TextBlockHeading;
