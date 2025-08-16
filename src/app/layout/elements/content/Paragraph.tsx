import { Trans, useTranslation } from 'react-i18next';
import { useUIStore } from '@/stores/useUIStore';
import useTranslationFallback from '@/hooks/useTranslationFallback';
import classNames from 'classnames';

interface ParagraphProps {
	rootKey: string;
	extra?: boolean;
	extra2x?: boolean;
	components: any;
	className?: string;
}

const Paragraph = ({
	rootKey,
	extra,
	extra2x,
	components,
	className,
}: ParagraphProps) => {
	const pageId = useUIStore((state) => state.pageId);
	const { i18n } = useTranslation(pageId);

	const paragraphsExists = i18n.exists(rootKey, {
		ns: pageId,
	});
	const paragraphs = useTranslationFallback<string[]>(rootKey, [], pageId);

	if (!paragraphsExists || paragraphs.length === 0) return null;

	return (
		<div
			className={classNames(['content-paragraphs space-y-2', className])}>
			{paragraphs.map((_, k) => (
				<p
					key={k}
					className={classNames({
						extra: extra,
						'extra-2x': extra2x,
					})}>
					<Trans
						ns={pageId}
						i18nKey={`${rootKey}.${k}`}
						components={components}
					/>
				</p>
			))}
		</div>
	);
};
export default Paragraph;
