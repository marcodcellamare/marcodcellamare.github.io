import { RefObject, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Pager, Title } from '@components/Misc';
import { Cover, Wrapper, Images } from './Fragments';
import { useIntersecting, useScrolling } from '@hooks';
import { SectionTemplate as SectionTemplateInterface } from '@interfaces/template/section';
import '@styles/components/Section.scss';

const Section = ({
	id,
	routeId,
	total,
	template,
	scrollPosition,
	slideTo,
	setActive,
}: {
	id: number;
	routeId: string;
	total: number;
	template: SectionTemplateInterface;
	scrollPosition: number;
	slideTo: Function;
	setActive: Function;
}) => {
	const { i18n } = useTranslation();
	const ref = useRef<HTMLDivElement>(null);
	const spacer = 'mb-10 mb-md-15';
	const isScrolling = useScrolling();
	const isIntersecting = useIntersecting(ref);

	// Function to check if the section covers the whole screen

	const isIntersectingWhole = useCallback((ref: RefObject<HTMLElement>) => {
		return (
			ref.current &&
			Math.floor(ref.current.getBoundingClientRect().top) <= 0 &&
			Math.floor(
				ref.current.getBoundingClientRect().top +
					ref.current.getBoundingClientRect().height
			) > 0
		);
	}, []);

	// Function to check if the section touches the top of the screen when scrolling,
	// possibly using a delta value

	const isIntersectingTop = useCallback(
		(ref: RefObject<HTMLElement>, delta?: number) => {
			delta =
				ref.current && delta
					? ref.current.getBoundingClientRect().height / delta
					: 0;

			return (
				ref.current &&
				Math.ceil(ref.current.getBoundingClientRect().top - delta) <=
					0 &&
				Math.ceil(ref.current.getBoundingClientRect().top + delta) > 0
			);
		},
		[]
	);

	// Function to check if the section touches the center of the screen when scrolling,
	// possibly using a delta value

	const isIntersectingCenter = useCallback(
		(ref: RefObject<HTMLElement>, delta?: number) => {
			delta =
				ref.current && delta
					? ref.current.getBoundingClientRect().height / delta
					: 0;

			return (
				ref.current &&
				Math.ceil(
					ref.current.getBoundingClientRect().top -
						ref.current.getBoundingClientRect().height / 2 -
						delta
				) <= 0 &&
				Math.ceil(
					ref.current.getBoundingClientRect().top +
						ref.current.getBoundingClientRect().height / 2 +
						delta
				) > 0
			);
		},
		[]
	);

	useEffect(() => {
		// Slide to the top of the active slide when the user is not scrolling
		if (!isScrolling && isIntersectingTop(ref, 4)) {
			slideTo(ref.current.offsetTop);
		}
	}, [isScrolling, slideTo, isIntersectingTop]);

	useEffect(() => {
		// Set active slide
		if (isIntersectingWhole(ref) || isIntersectingCenter(ref)) {
			setActive({ id, theme: template.theme });
		}
	}, [
		id,
		template.theme,
		scrollPosition,
		setActive,
		isIntersectingWhole,
		isIntersectingCenter,
	]);

	return (
		<section
			ref={ref}
			className={`section-${id} section-${template.theme}${
				isIntersecting ? ' visible' : ''
			} d-flex overflow-hidden position-relative`}>
			<div className='container position-relative d-flex flex-grow-1 flex-row py-20 py-lg-40 py-xl-50'>
				{total > 1 ? <Pager id={id} /> : null}
				{!['cover'].includes(template.layout) ? (
					<div className='row align-self-center flex-grow-1'>
						<div className='col d-flex'>
							<div className='section-wrapper row flex-grow-1 position-relative'>
								{['left', 'right', undefined].includes(
									template.layout
								) ? (
									<div className='col-12 col-md-5 align-self-center mb-10 mb-sm-15 mb-md-0'>
										<Images
											images={template.images}
											blob={template.imageBlob}
										/>
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
										routeId={routeId}
										className={spacer}
										template={template}
									/>
								</div>
							</div>
						</div>
					</div>
				) : (
					<Cover className='d-flex flex-grow-1' />
				)}
			</div>
			<Title
				content={i18n.t(`page.${routeId}:sections.${id}.SLIDE_TITLE`)}
			/>
		</section>
	);
};
export default Section;
