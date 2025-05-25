import { useTranslation } from 'react-i18next';
//import { useTemplate } from '@components/Provider/Template';

import Content from './Content';
import Buttons from '../Groups/Buttons';
import Brands from '../Groups/Brands';
import Counters from '../Groups/Counters';
import Periods from '../Groups/Periods';
import Lists from '../Groups/Lists';

import ItfRoutesTree from '@interfaces/routesTree';

const Wrapper = ({
	sectionId,
	route,
	className,
}: {
	sectionId: number;
	route: ItfRoutesTree;
	className?: string;
}) => {
	const { i18n } = useTranslation();
	//const template = useTemplate();

	const components = [
		{ type: 'buttons', _: Buttons },
		{ type: 'counters', _: Counters },
		{ type: 'lists', _: Lists },
		{ type: 'periods', _: Periods },
		{ type: 'brands', _: Brands },
	];
	return (
		<>
			{components.map((component, k) => {
				return (
					<div>{component.type}</div>
				); /*template[id][component.type] &&
					template[id][component.type].length > 0 ? (
					<component._
						key={k}
						id={id}
						routeId={route.id}
						className={className}
						items={template[id][component.type]}
					/>
				) : null;
			*/
			})}
		</>
	);
};
export default Wrapper;
