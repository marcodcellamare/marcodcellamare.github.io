import config from '@config';

import Link from './Link';

import { PageIdType } from '@/types/config.const';

const Menu = () => (
	<ul className='nav-menu relative my-auto flex flex-col flex-1 justify-center min-w-fit font-title text-4xl sm:text-5xl lg:text-6xl leading-[0.9em]'>
		{(Object.keys(config.pages.list) as PageIdType[]).map(
			(pageId) =>
				!config.pages.list[pageId].startsWith(config.pages.hide) && (
					<li key={pageId}>
						<Link id={pageId} />
					</li>
				)
		)}
	</ul>
);
export default Menu;
