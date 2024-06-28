import { useScrolling } from '@/hooks';
import '@styles/components/Title.scss';

const Title = ({ content }: { content: string }) => {
	const isScrolling = useScrolling();

	return (
		<div
			className={`title${
				isScrolling ? ' show' : ''
			} px-5 py-2 pe-none position-fixed top-50 start-0 translate-middle-y z-3 small fw-bold text-light text-uppercase text-truncate`}>
			{content}
		</div>
	);
};
export default Title;
