import { Trans, useTranslation } from 'react-i18next';
import { useUIStore } from '@/stores/useUIStore';
import useTranslationFallback from '@/hooks/useTranslationFallback';

import { PlusIcon } from 'lucide-react';
import classNames from 'classnames';

interface ListProps {
	rootKey: string;
	components: any;
	className?: string;
}

const List = ({ rootKey, components, className }: ListProps) => {
	const pageId = useUIStore((state) => state.pageId);
	const { i18n } = useTranslation(pageId);

	const listExists = i18n.exists(rootKey, {
		ns: pageId,
	});
	const list = useTranslationFallback<string[]>(rootKey, [], pageId);

	if (!listExists || list.length === 0) return null;

	return (
		<ul className={classNames(['space-y-2', className])}>
			{list.map((_, k) => (
				<li
					key={k}
					className='flex items-start gap-2'>
					<span className='shrink-0 w-10 text-(--color-theme-link)'>
						<PlusIcon className='text-svg text-svg-squared text-[120%] stroke-5' />
					</span>
					<span>
						<Trans
							ns={pageId}
							i18nKey={`${rootKey}.${k}`}
							components={components}
						/>
					</span>
				</li>
			))}
		</ul>
	);
};
export default List;
