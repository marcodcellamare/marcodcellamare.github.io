import Carousel from '!/app/layout/elements/carousel';
import Default from '!/app/layout/templates/Default';
import Ruler from './Ruler';

const Timeline = () => (
	<Carousel template={<Default />}>
		<Ruler />
	</Carousel>
);

export default Timeline;
