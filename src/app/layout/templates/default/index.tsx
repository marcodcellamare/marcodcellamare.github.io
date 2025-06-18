import { useSection } from '!/contexts/section';
import { useSettings } from '!/contexts/settings';
import { useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';
import classNames from 'classnames';

import Container from '../../elements/Container';
import Content from '../../elements/content';
import Image from '../../elements/Image';

const Default = () => {
	const { pageId } = useRouter();
	const { i18n } = useTranslation(pageId);
	const { template, sectionId } = useSection();
	const { spaceRef } = useSettings();

	const rootKey = `sections.${sectionId}.content.0`;
	const imageExists = i18n.exists(`${rootKey}.image`, {
		ns: pageId,
	});

	return (
		<Container
			className={classNames([
				'flex flex-col lg:flex-row lg:items-center',
				spaceRef.current.content,
			])}>
			{['default:left', 'default:right'].includes(template) &&
				imageExists && (
					<Image
						rootKey={`${rootKey}.image`}
						className={classNames([
							'lg:flex-1 min-w-0 h-60',
							'lg:h-auto lg:-translate-x-1/20 lg:-translate-y-5/20',
							'transition-[scale,filter] duration-200 ease-in-out',
							'scale-190 lg:scale-350 xl:scale-160 2xl:scale-130',
							'hover:scale-195 hover:lg:scale-355 hover:xl:scale-165 hover:2xl:scale-135 hover:z-1',
							'drop-shadow-2xl/5 hover:drop-shadow-2xl/30',
							{
								'order-first': template === 'default:left',
							},
						])}
					/>
				)}
			<Content
				rootKey={rootKey}
				className={classNames([
					'min-w-0',
					template === 'default:full'
						? 'lg:basis-9/12'
						: 'lg:basis-9/12 xl:basis-7/12',
				])}
			/>
		</Container>
	);
};

export default Default;
