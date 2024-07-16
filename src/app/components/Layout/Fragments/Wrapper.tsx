import { useTranslation } from 'react-i18next';
import { useTemplate } from '@components/Misc/TemplateProvider';
import { Content, Counters } from './';
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

	return (
		<>
			<Content
				id={id}
				className={className}
				title={i18n.t(`page.${route.id}:sections.${id}.TITLE`)}
				subtitle={i18n.t(`page.${route.id}:sections.${id}.SUBTITLE`)}
				text={i18n.t(`page.${route.id}:sections.${id}.TEXT`)}
			/>
			<Counters
				id={id}
				routeId={route.id}
				items={template[id].counters}
			/>
		</>
	);
};
export default Wrapper;
