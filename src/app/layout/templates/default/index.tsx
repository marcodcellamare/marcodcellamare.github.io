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
							'lg:basis-6/12 xl:basis-5/12 min-w-0 h-60 lg:h-auto lg:-translate-x-1/20 lg:-translate-y-5/20 drop-shadow-2xl/5',
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
						: 'lg:basis-6/12 xl:basis-7/12',
				])}
			/>
		</Container>
	);
};

export default Default;
