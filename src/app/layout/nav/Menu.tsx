import Link from './Link';
import config from '!config';

import { PageIdType } from '!/types/config.const';

const Menu = () => (
	<ul className='relative my-auto flex flex-col justify-center h1'>
		{(Object.keys(config.pages.list) as PageIdType[]).map((pageId) =>
			!config.pages.list[pageId].startsWith(config.pages.hide) ? (
				<li key={pageId}>
					<Link thisPageId={pageId} />
				</li>
			) : null
		)}
	</ul>
);
export default Menu;
