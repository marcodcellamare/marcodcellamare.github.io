import { Trans, useTranslation } from 'react-i18next';
import { useUIStore } from '@/stores/useUIStore';
import classNames from 'classnames';

interface HeadingProps {
	rootKey: string;
	extra?: boolean;
	components: any;
	className?: string;
}

const Heading = ({ rootKey, extra, components, className }: HeadingProps) => {
	const pageId = useUIStore((state) => state.pageId);
	const { i18n, t } = useTranslation(pageId);

	const titleExists = i18n.exists(`${rootKey}.title`, { ns: pageId });
	const headlineExists = i18n.exists(`${rootKey}.headline`, { ns: pageId });
	const subtitleExists = i18n.exists(`${rootKey}.subtitle`, { ns: pageId });

	if (!titleExists) return null;

	return (
		<div
			className={classNames([
				'flex flex-col heading space-y-1 xl:space-y-2 text-(--color-theme-heading) uppercase',
				className,
			])}>
			{headlineExists && (
				<span
					className={classNames([
						extra ? 'h2' : 'h5',
						'block font-black',
					])}>
					<Trans
						ns={pageId}
						i18nKey={`${rootKey}.headline`}
						components={components}
					/>
				</span>
			)}
			<h2
				className={classNames([
					'h1 block font-black',
					{
						extra: extra,
					},
				])}>
				{t(`${rootKey}.title`)}
			</h2>
			{subtitleExists && (
				<h3 className={classNames(['block', extra ? 'h3' : 'h4'])}>
					<Trans
						ns={pageId}
						i18nKey={`${rootKey}.subtitle`}
						components={components}
					/>
				</h3>
			)}
		</div>
	);
};
export default Heading;
