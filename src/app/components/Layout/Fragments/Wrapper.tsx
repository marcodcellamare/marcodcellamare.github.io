import { useTranslation } from 'react-i18next';
import { useTemplate } from '@components/Provider/Template';
import { Content, Counters, Buttons, Brands } from './';
import RoutesTreeInterface from '@interfaces/routesTree';

const Wrapper = ({
	id,
	route,
	className,
}: {
	id: number;
	route: RoutesTreeInterface;
	className?: string;
}) => {
	const { i18n } = useTranslation();
	const template = useTemplate();

	const components = [
		{ type: 'buttons', _: Buttons },
		{ type: 'counters', _: Counters },
		{ type: 'brands', _: Brands },
	];
	return (
		<>
			<Content
				id={id}
				className={className}
				title={i18n.t(`page.${route.id}:sections.${id}.TITLE`)}
				subtitle={i18n.t(`page.${route.id}:sections.${id}.SUBTITLE`)}
				text={i18n.t(`page.${route.id}:sections.${id}.TEXT`)}
			/>
			{components.map((component, k) => {
				return template[id][component.type] &&
					template[id][component.type].length > 0 ? (
					<component._
						key={k}
						id={id}
						routeId={route.id}
						className={className}
						items={template[id][component.type]}
					/>
				) : null;
			})}
		</>
	);
};
export default Wrapper;
