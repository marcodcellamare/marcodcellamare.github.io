import { useTranslation } from 'react-i18next';
import { useRouter } from '@/contexts/router';
import { useSettings } from '@/contexts/settings';
import classNames from 'classnames';

import Button from './Button';

import { SectionInterface } from '@/types/layout';

const MiniMap = () => {
	const { pageId } = useRouter();
	const { t } = useTranslation(pageId);
	const { spaceRef } = useSettings();

	const sections = t('sections', {
		returnObjects: true,
		defaultValue: [],
	}) as SectionInterface[];

	if (sections.length < 2) return null;

	return (
		<div
			className={classNames([
				'sections absolute top-0 right-0 flex flex-col items-end',
				spaceRef.current.absEdge,
			])}>
			{sections.map((_, k) => (
				<Button
					key={k}
					sectionId={k}
				/>
			))}
		</div>
	);
};
export default MiniMap;
