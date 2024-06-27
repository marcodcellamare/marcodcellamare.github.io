import Section from './Section';
import { SectionTemplate as SectionTemplateInterface } from '@/types/template/section';
import RoutesTreeInterface from '@interfaces/routesTree';

const Main = ({
	route,
	template,
}: {
	route: RoutesTreeInterface;
	template: SectionTemplateInterface[];
}) => {
	return (
		<main className='flex-grow-1 position-relative'>
			<article className='position-absolute top-0 bottom-0 start-0 end-0 overflow-hidden overflow-y-auto'>
				{template.map((sectionTemplate, k) => {
					return (
						<Section
							key={k}
							id={k}
							total={template.length}
							routeId={route.id || ''}
							template={sectionTemplate}
						/>
					);
				})}
			</article>
		</main>
	);
};
export default Main;
