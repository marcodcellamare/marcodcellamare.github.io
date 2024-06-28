import { Content } from './';
import { Section as SectionInterface } from '@interfaces/template/section';

const Wrapper = ({
	id,
	className,
	translations,
}: {
	id: number;
	className?: string;
	translations: SectionInterface;
}) => {
	return (
		<>
			<Content
				id={id}
				className={className}
				title={translations.TITLE}
				subtitle={translations.SUBTITLE}
				text={translations.TEXT}
			/>
		</>
	);
};
export default Wrapper;
