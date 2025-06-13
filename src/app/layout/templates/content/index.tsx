import { useSection } from '!/contexts/section';
import classNames from 'classnames';

import TextBlock from '../../elements/TextBlock';

const Content = () => {
	const { template } = useSection();

	return (
		<>
			{['text:left', 'text:right'].includes(template) ? (
				<div
					className={classNames([
						'md:basis-4/9 lg:basis-2/5 min-w-0',
						{
							'order-first': template === 'text:left',
						},
					])}>
					<div className='w-full aspect-square bg-red-500/50'>
						IMAGE
					</div>
				</div>
			) : null}
			<TextBlock
				className={classNames([
					'min-w-0',
					template === 'text:full'
						? 'md:basis-9/12'
						: 'md:basis-5/9 lg:basis-3/5',
				])}
			/>
		</>
	);
};

export default Content;
