import { useRef } from 'react';
import { Pager, Title } from '@components/Misc';
import { Cover, Wrapper } from './Fragments';
import { useIntersecting } from '@/hooks';
import {
	Section as SectionInterface,
	SectionTemplate as SectionTemplateInterface,
} from '@interfaces/template/section';
import '@styles/components/Section.scss';

const Section = ({
	id,
	total,
	template,
	translations,
}: {
	id: number;
	total: number;
	template: SectionTemplateInterface;
	translations: SectionInterface;
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const spacer = 'mb-10 mb-md-15';
	const isIntersecting = useIntersecting(ref);

	return (
		<section
			ref={ref}
			className={`section-${id} section-${template.theme}${
				isIntersecting ? ' visible' : ''
			} d-flex overflow-hidden position-relative`}>
			<div className='container position-relative d-flex flex-grow-1 flex-row py-20 py-lg-40 py-xl-50'>
				{total > 1 ? <Pager id={id} /> : null}
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
								(['left', undefined].includes(template.layout)
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
					<Cover className='d-flex flex-grow-1' />
				)}
			</div>
			{translations.SLIDE_TITLE ? (
				<Title content={translations.SLIDE_TITLE} />
			) : null}
		</section>
	);
};
export default Section;
