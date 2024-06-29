import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
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
	const { i18n } = useTranslation();

	return (
		<>
			<Helmet>
				<title>{i18n.t([`pages.${route.id}.TITLE`, ''])}</title>
				<meta
					name='description'
					content={i18n.t([`pages.${route.id}.DESCRIPTION`, ''])}
				/>
			</Helmet>
			<main className='flex-grow-1 position-relative'>
				<article className='position-absolute top-0 bottom-0 start-0 end-0 overflow-hidden overflow-y-auto'>
					{template.map((sectionTemplate, k) => {
						return (
							<Section
								key={k}
								id={k}
								total={template.length}
								template={sectionTemplate}
								translations={i18n.t(
									`pages.${route.id}.sections.${k}`,
									{ returnObjects: true }
								)}
							/>
						);
					})}
				</article>
			</main>
		</>
	);
};
export default Main;
