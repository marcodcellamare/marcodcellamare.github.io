import { Trans, useTranslation } from 'react-i18next';
import { useUIStore } from '@/stores/useUIStore';
import useTranslationFallback from '@/hooks/useTranslationFallback';

interface ParagraphProps {
	rootKey: string;
	components: any;
	className?: string;
}

const Paragraph = ({ rootKey, components, className }: ParagraphProps) => {
	const pageId = useUIStore((state) => state.pageId);
	const { i18n } = useTranslation(pageId);

	const paragraphsExists = i18n.exists(rootKey, {
		ns: pageId,
	});
	const paragraphs = useTranslationFallback<string[]>(rootKey, [], pageId);

	if (!paragraphsExists || paragraphs.length === 0) return null;

	return paragraphs.map((_, k) => (
		<p
			key={k}
			className={className}>
			<Trans
				ns={pageId}
				i18nKey={`${rootKey}.${k}`}
				components={components}
			/>
		</p>
	));
};
export default Paragraph;
