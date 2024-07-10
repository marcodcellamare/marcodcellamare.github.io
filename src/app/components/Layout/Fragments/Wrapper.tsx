import { Counter } from '@components/Misc';
import { Content } from './';
import {
	SectionTemplate as SectionTemplateInterface,
	Section as SectionInterface,
} from '@interfaces/template/section';
import { useTranslation } from 'react-i18next';

const Wrapper = ({
	id,
	routeId,
	className,
	template,
}: {
	id: number;
	routeId: string;
	className?: string;
	template: SectionTemplateInterface;
}) => {
	const { i18n } = useTranslation();

	return (
		<>
			<Content
				id={id}
				className={className}
				title={i18n.t(`pages.${routeId}.sections.${id}.TITLE`)}
				subtitle={i18n.t(`pages.${routeId}.sections.${id}.SUBTITLE`)}
				text={i18n.t(`pages.${routeId}.sections.${id}.TEXT`)}
			/>
			{template.counters &&
				template.counters.map((counter, k) => {
					return (
						<Counter
							key={k}
							since={counter.since}
							newLineAt={counter.newLineAt}
							className={counter.className}
							classNamePre={counter.classNamePre}
							classNamePost={counter.classNamePost}
							prefx={i18n.t(
								`pages.${routeId}.sections.${id}.counters.${k}.PREFX`
							)}
							suffx={i18n.t(
								`pages.${routeId}.sections.${id}.counters.${k}.SUFFX`
							)}
						/>
					);
				})}
		</>
	);
};
export default Wrapper;
