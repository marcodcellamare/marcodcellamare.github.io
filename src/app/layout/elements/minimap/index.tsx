import { useUIStore } from '@/stores/useUIStore';
import useTranslationFallback from '@/hooks/useTranslationFallback';
import classNames from 'classnames';

import Button from './Button';

import { SectionInterface } from '@/types/layout';

const MiniMap = () => {
	const spacing = useUIStore((state) => state.spacing);
	const pageId = useUIStore((state) => state.pageId);

	const sections = useTranslationFallback<SectionInterface[]>(
		'sections',
		[],
		pageId
	);

	if (sections.length < 2) return null;

	return (
		<div
			className={classNames([
				'minimap absolute top-0 right-0 flex flex-col gap-0.5 items-end mix-blend-difference',
				spacing.absEdge,
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
