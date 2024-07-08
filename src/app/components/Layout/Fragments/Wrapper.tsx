import { Counter } from '@components/Misc';
import { Content } from './';
import {
	SectionTemplate as SectionTemplateInterface,
	Section as SectionInterface,
} from '@interfaces/template/section';

const Wrapper = ({
	id,
	className,
	template,
	translations,
}: {
	id: number;
	className?: string;
	template: SectionTemplateInterface;
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
			<Counter />

			{translations.counters ? translations.counters.length : 'NOPE'}
		</>
	);
};
export default Wrapper;
