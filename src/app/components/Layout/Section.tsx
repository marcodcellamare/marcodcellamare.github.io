import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pager, Title } from '@components/Misc';
import { Wrapper } from './Fragments';
import { useIntersecting } from '@/hooks';
import {
	Section as SectionInterface,
	SectionTemplate as SectionTemplateInterface,
} from '@interfaces/template/section';
import '@styles/components/Section.scss';

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
	const ref = useRef<HTMLDivElement>(null);
	const spacer = 'mb-10 mb-md-15';

	const { i18n } = useTranslation();
	const isIntersecting = useIntersecting(ref);
	const [translations, setTranslations] = useState<SectionInterface>({});

	// Get the translation block for the specific section

	useEffect(() => {
		setTranslations(
			i18n.t(`pages.${routeId}.sections.${id}`, { returnObjects: true })
		);
	}, [i18n, routeId, id]);

	return (
		<section
			ref={ref}
			className={`section-${id} section-${template.theme}${
				isIntersecting ? ' visible' : ''
			} d-flex overflow-hidden position-relative`}>
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
									<Wrapper
										id={id}
										className={spacer}
										translations={translations}
									/>
								</div>
							</div>
						) : (
							<div>COVER</div>
						)}
					</div>
				</div>
			</div>
			{translations.SLIDE_TITLE ? (
				<Title content={translations.SLIDE_TITLE} />
			) : null}
		</section>
	);
};
export default Section;
