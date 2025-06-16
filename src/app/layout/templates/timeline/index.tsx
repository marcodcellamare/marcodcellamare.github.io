import { ChevronRightIcon } from 'lucide-react';
import Container from '../../elements/Container';

/*!SECTIONconst goToSlide = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

<a onClick={() => goToSlide('slide2')} className="cursor-pointer">
  Go to Slide 2
</a>*/

const Timeline = () => {
	return (
		<div className='carousel w-full'>
			{new Array(4).fill(false).map((_, k) => (
				<div
					key={k}
					className='carousel-item relative w-full'>
					<Container className='flex flex-row items-center gap-10'>
						<div className='basis-4/9 min-w-0 border'>
							<img
								src='images/mario.png'
								className='ml-[-15%] w-[115%] max-w-none'
							/>
						</div>
						<div className='basis-5/9 min-w-0 border'>TEXT</div>
					</Container>
				</div>
			))}
			<div className='carousel-nav absolute top-1/2 left-10 right-0 -translate-y-1/2'>
				<button
					type='button'
					className='btn'>
					<ChevronRightIcon />
				</button>
			</div>
		</div>
	);
};

export default Timeline;
