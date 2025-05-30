import { useRouter } from '!/contexts/router';
import classNames from 'classnames';

const Background = () => {
	const { isNavOpened } = useRouter();

	return (
		<div className='absolute top-0 bottom-0 left-0 right-0'>
			{new Array(3).fill(false).map((_, k) => (
				<div
					key={k}
					className={classNames([
						'bg-primary h-1/3 transition-[width] duration-700 ease-in-out',
						!isNavOpened ? 'w-0' : 'w-full',
						{
							'delay-100': k === 1,
							'delay-200': k === 2,
						},
					])}
				/>
			))}
		</div>
	);
};
export default Background;
