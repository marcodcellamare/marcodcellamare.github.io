import { Text } from '@components/Misc';

const Content = ({
	id,
	title,
	subtitle,
	text,
	className,
}: {
	id: number;
	title?: string;
	subtitle?: string;
	text?: string;
	className?: string;
}) => {
	return (
		<div className={`section-content ${className}`.trim()}>
			<Text
				as={id === 0 ? 'h1' : 'h2'}
				className={`display-2 fw-bold ${
					subtitle || text ? 'mt-0 mb-5' : 'my-0'
				}`}>
				{title}
			</Text>
			<Text className={`lead ${text ? 'mt-0 mb-5' : 'my-0'}`}>
				{subtitle}
			</Text>
			<Text className='my-0'>{text}</Text>
		</div>
	);
};
export default Content;
