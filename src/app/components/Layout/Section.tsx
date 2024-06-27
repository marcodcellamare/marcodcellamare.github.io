import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Section as SectionInterface,
	SectionTemplate as SectionTemplateInterface,
} from '@interfaces/template/section';
import { Pager } from '@components/Misc';
import '@styles/components/Section.scss';
import { Content } from './Fragments';

const Section = ({
	id,
	total,
	routeId,
	template,
}: {
	id: number;
	total: number;
	routeId: string;
	template: SectionTemplateInterface;
}) => {
	const { i18n } = useTranslation();
	const [translations, setTranslations] = useState<SectionInterface>({});
	const spacer = 'mb-10 mb-md-15';

	useEffect(() => {
		// Get the translation block for the specific section

		setTranslations(
			i18n.t(`pages.${routeId}.sections.${id}`, { returnObjects: true })
		);
	}, [i18n, routeId, id]);

	return (
		<section
			className={`section-${id} section-${template.theme} d-flex overflow-hidden position-relative`}>
			<div className='container position-relative d-flex flex-grow-1 flex-row py-20 py-lg-40 py-xl-50'>
				{total > 1 ? <Pager id={id} /> : null}
				<div className='row flex-grow-1 align-self-center position-relative'>
					<div className='col'>
						{!['cover'].includes(template.layout) ? (
							<div className='section-wrapper row flex-grow-1 position-relative'>
								{['left', 'right', undefined].includes(
									template.layout
								) ? (
									<div className='col-12 col-md-5 align-self-center mb-10 mb-sm-15 mb-md-0'>
										IMAGE
									</div>
								) : null}
								<div
									className={
										'col-12 align-self-center position-relative z-1' +
										(['left', 'right', undefined].includes(
											template.layout
										)
											? ' col-md-7 pe-md-20'
											: '') +
										(['full'].includes(template.layout)
											? ' col-md-9 col-lg-8'
											: '') +
										(['left', undefined].includes(
											template.layout
										)
											? ' order-md-first'
											: '')
									}>
									<Content
										id={id}
										title={translations.TITLE}
										subtitle={translations.SUBTITLE}
										text={translations.TEXT}
										className={spacer}
									/>
								</div>
							</div>
						) : (
							<div>COVER</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};
export default Section;
