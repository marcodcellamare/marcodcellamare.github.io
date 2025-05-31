import { useRouter } from '!/contexts/router';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import Heading from './elements/Heading';
import Container from './elements/Container';
import Content from './elements/Content';

interface SectionProps {
	sectionId: number;
	className?: string;
}

const Section = ({ sectionId, className = '' }: SectionProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);

	return (
		<section
			data-theme={t(`sections.${sectionId}.theme`, 'light-gray')}
			className={classNames([
				'flex items-center min-h-full relative overflow-hidden bg-base-200 text-base-content',
				className,
			])}>
			{i18n.exists(`${pageId}:sections.${sectionId}.heading.h0`) ? (
				<Heading
					as='h2'
					parallaxProps={{ speed: -10 }}
					className='h0 absolute left-0 -translate-x-[2%] flex items-center text-base-100 overflow-hidden'>
					{t(`sections.${sectionId}.heading.h0`)}
				</Heading>
			) : null}
			<Container className='py-20'>
				{
					//<Content sectionId={sectionId} />
				}
				xxx
			</Container>
		</section>
	);
};
export default Section;
