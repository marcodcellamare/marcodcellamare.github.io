import { useTranslation } from 'react-i18next';
import { useUIStore } from '@/stores/useUIStore';

import Brand from './Brand';
import { useSection } from '@/contexts/section';
import useTranslationFallback from '@/hooks/useTranslationFallback';

const Brands = () => {
	const pageId = useUIStore((state) => state.pageId);
	const { i18n } = useTranslation(pageId);
	const { sectionId } = useSection();

	const rootKey = `sections.${sectionId}.brands`;

	const brandsExists = i18n.exists(rootKey, {
		ns: pageId,
	});
	const brands = useTranslationFallback<Record<string, string>>(
		rootKey,
		{},
		pageId
	);

	if (!brandsExists) return null;

	return (
		<div className='brands flex-1 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-x-10 xl:gap-x-15 gap-y-5'>
			{Object.keys(brands).map((name, k) => (
				<Brand
					key={k}
					name={name}
					title={brands[name] ?? ''}
					className='flex-1'
				/>
			))}
		</div>
	);
};
export default Brands;
