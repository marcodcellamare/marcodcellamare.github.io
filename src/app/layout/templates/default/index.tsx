import { useSection } from '!/contexts/section';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

import Container from '../../elements/Container';
import Content from '../../elements/content';
import Image from '../../elements/Image';

const Default = () => {
	const { template, sectionId } = useSection();
	const { spaceRef } = useSettings();

	const rootKey = `sections.${sectionId}.content.0`;

	return (
		<Container
			className={classNames([
				'flex flex-col lg:flex-row lg:items-center',
				spaceRef.current.content,
			])}>
			{['default:left', 'default:right'].includes(template) && (
				<Image
					rootKey={`${rootKey}.image`}
					className={classNames([
						'md:basis-4/9 lg:basis-2/5 min-w-0',
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
						? 'md:basis-9/12'
						: 'md:basis-5/9 lg:basis-3/5',
				])}
			/>
		</Container>
	);
};

export default Default;
