import { Trans, useTranslation } from 'react-i18next';
import { useUIStore } from '@/stores/useUIStore';
import classNames from 'classnames';

interface LeadingProps {
	rootKey: string;
	extra?: boolean;
	components: any;
	className?: string;
}

const Leading = ({ rootKey, extra, components, className }: LeadingProps) => {
	const pageId = useUIStore((state) => state.pageId);
	const { i18n } = useTranslation(pageId);

	const leadingExists = i18n.exists(rootKey, {
		ns: pageId,
	});

	if (!leadingExists) return null;

	return (
		<p
			className={classNames([
				'leading',
				className,
				{
					extra: extra,
				},
			])}>
			<Trans
				ns={pageId}
				i18nKey={rootKey}
				components={components}
			/>
		</p>
	);
};
export default Leading;
