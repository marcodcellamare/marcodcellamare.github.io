import { Trans, useTranslation } from 'react-i18next';
import { useRouter } from '@/contexts/router';

interface ParagraphProps {
	rootKey: string;
	components: any;
}

const Paragraph = ({ rootKey, components }: ParagraphProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);

	const paragraphsExists = i18n.exists(`${rootKey}`, {
		ns: pageId,
	});
	const paragraphs = t(`${rootKey}`, {
		returnObjects: true,
		defaultValue: [],
	}) as string[];

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
