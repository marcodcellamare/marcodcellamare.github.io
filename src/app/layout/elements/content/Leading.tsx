import { Trans, useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';
import { useSection } from '!/contexts/section';
import classNames from 'classnames';

interface LeadingProps {
	rootKey: string;
	components: any;
	className?: string;
}

const Leading = ({ rootKey, components, className = '' }: LeadingProps) => {
	const { pageId } = useRouter();
	const { i18n } = useTranslation(pageId);
	const { sectionId } = useSection();

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
					extra: sectionId === 0,
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
