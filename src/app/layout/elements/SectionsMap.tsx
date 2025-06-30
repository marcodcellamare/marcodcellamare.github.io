import { useRouter } from '!/contexts/router';
import { useSettings } from '!/contexts/settings';
import { SectionInterface } from '!/types/layout';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

const SectionsMap = () => {
	const { pageId } = useRouter();
	const { t } = useTranslation(pageId);
	const { sectionRefs, spaceRef, activeSectionId } = useSettings();

	const sections = t('sections', {
		returnObjects: true,
		defaultValue: [],
	}) as SectionInterface[];

	const handleClick = (sectionId: number) =>
		sectionRefs.current[sectionId]?.scrollIntoView({
			behavior: 'smooth',
		});

	if (sections.length < 2) return null;

	return (
		<div
			className={classNames([
				'sections absolute top-0 right-0 flex flex-col items-end',
				spaceRef.current.absEdge,
			])}>
			{sections.map((section, k) => (
				<button
					key={k}
					type='button'
					role='button'
					className={classNames([
						'pr-5 mb-0.5 bg-[var(--color-palette-gray)] transition-[min-width,height,padding-left] duration-500 delay-100 ease-in-out flex flex-col justify-center items-end overflow-hidden mix-blend-difference',
						activeSectionId !== k
							? 'min-w-[1rem] hover:min-w-10 h-5 pl-0'
							: 'h-10 pl-5',
					])}
					disabled={activeSectionId === k}
					onClick={() => handleClick(k)}>
					<div
						className={classNames([
							'text-xxs font-black font-title uppercase text-nowrap text-end transition-[max-width] duration-600 ease-in-out overflow-hidden text-[var(--color-palette-gray)] mix-blend-difference',
							activeSectionId !== k
								? 'max-w-0'
								: 'max-w-100 delay-400',
						])}>
						{section.title}
					</div>
				</button>
			))}
		</div>
	);
};
export default SectionsMap;
