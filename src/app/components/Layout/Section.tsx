import { RefObject, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Title from '@components/Misc/Title';
import Pager from './Elements/Pager';
import Cover from './Views/Cover';
import { useIntersecting, useScrolling } from '@hooks';
import ItfRoutesTree from '@interfaces/routesTree';
import '@styles/components/Section.scss';
import Default from './Views/Default';
import Wrapper from './Views/Wrapper';
import Content from './Views/Content';

const Section = ({
	sectionId,
	route,
	theme = '',
	layout = 'left',
	showPager,
	scrollPosition,
	slideTo,
	setActive,
}: {
	sectionId: number;
	route: ItfRoutesTree;
	theme?: string;
	layout?: string;
	showPager: boolean;
	scrollPosition: number;
	slideTo: Function;
	setActive: Function;
}) => {
	const { i18n } = useTranslation();
	const ref = useRef<HTMLDivElement>(null);
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

	// A function that returns the right view

	const views = useCallback(() => {
		switch (layout) {
			case 'cover':
				return <Cover className='d-flex flex-grow-1' />;

			default:
				return (
					<Default className='align-self-center flex-grow-1'>
						<Content
							sectionId={sectionId}
							className='mb-10 mb-md-15'
							title={i18n.t(
								`page.${route.id}:sections.${sectionId}.content.TITLE`
							)}
							subtitle={i18n.t(
								`page.${route.id}:sections.${sectionId}.content.SUBTITLE`
							)}
							text={i18n.t(
								`page.${route.id}:sections.${sectionId}.content.TEXT`
							)}
						/>
						<Wrapper
							sectionId={sectionId}
							route={route}
							className='mb-10 mb-md-15'
						/>
					</Default>
				);
		}
	}, [i18n, layout, sectionId, route]);

	useEffect(() => {
		// Slide to the top of the active slide when the user is not scrolling
		if (!isScrolling && isIntersectingTop(ref, 4)) {
			slideTo(ref.current.offsetTop);
		}
	}, [isScrolling, slideTo, isIntersectingTop]);

	useEffect(() => {
		// Set active slide
		if (isIntersectingWhole(ref) || isIntersectingCenter(ref)) {
			setActive({ sectionId, theme: theme });
		}
	}, [
		sectionId,
		theme,
		scrollPosition,
		setActive,
		isIntersectingWhole,
		isIntersectingCenter,
	]);

	return (
		<section
			ref={ref}
			className={`section-${sectionId} section-${theme}${
				isIntersecting ? ' visible' : ''
			} d-flex overflow-hidden position-relative`}>
			<div
				className={`container position-relative d-flex flex-grow-1 flex-row ${
					!['cover'].includes(layout)
						? 'py-20 py-lg-40 py-xl-50'
						: 'py-10'
				}`}>
				{showPager ? <Pager sectionId={sectionId} /> : null}
				{views()}
			</div>
			<Title
				content={i18n.t(
					`page.${route.id}:sections.${sectionId}.content.NAME`
				)}
			/>
		</section>
	);
};
export default Section;
