import { Trans, useTranslation } from 'react-i18next';
import { useUIStore } from '@/stores/useUIStore';
import { useSection } from '@/contexts/section';
import classNames from 'classnames';

import '@/styles/components/elements/Heading.css';

interface HeadingProps {
	rootKey: string;
	className?: string;
}

const Heading = ({ rootKey, className }: HeadingProps) => {
	const { sectionId } = useSection();
	const pageId = useUIStore((state) => state.pageId);
	const { i18n, t } = useTranslation(pageId);

	const titleExists = i18n.exists(`${rootKey}.title`, { ns: pageId });
	const headlineExists = i18n.exists(`${rootKey}.headline`, { ns: pageId });
	const subtitleExists = i18n.exists(`${rootKey}.subtitle`, { ns: pageId });

	if (!titleExists) return null;

	return (
		<div
			className={classNames([
				'heading text-(--color-theme-heading) uppercase',
				className,
			])}>
			{headlineExists && (
				<span
					className={classNames([
						sectionId === 0 ? 'h2' : 'h5',
						'block font-black',
					])}>
					{t(`${rootKey}.headline`)}
				</span>
			)}
			<h2
				className={classNames([
					'h1 block font-black',
					{
						extra: sectionId === 0,
					},
				])}>
				{t(`${rootKey}.title`)}
			</h2>
			{subtitleExists && (
				<h3
					className={classNames([
						'block',
						sectionId === 0 ? 'h3' : 'h4',
					])}>
					<Trans
						ns={pageId}
						i18nKey={`${rootKey}.subtitle`}
					/>
				</h3>
			)}
		</div>
	);
};
export default Heading;
