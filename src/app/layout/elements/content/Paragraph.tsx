import { Trans, useTranslation } from 'react-i18next';
import { useRouter } from '@/contexts/router';
import useTranslationFallback from '@/hooks/useTranslationFallback';

interface ParagraphProps {
	rootKey: string;
	components: any;
}

const Paragraph = ({ rootKey, components }: ParagraphProps) => {
	const { pageId } = useRouter();
	const { i18n } = useTranslation(pageId);

	const paragraphsExists = i18n.exists(`${rootKey}`, {
		ns: pageId,
	});
	const paragraphs = useTranslationFallback<string[]>(rootKey, [], pageId);

	if (!paragraphsExists || paragraphs.length === 0) return null;

	return paragraphs.map((_, k) => (
		<p key={k}>
			<Trans
				ns={pageId}
				i18nKey={`${rootKey}.${k}`}
				components={components}
			/>
		</p>
	));
};
export default Paragraph;
