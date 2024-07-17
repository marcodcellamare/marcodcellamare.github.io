import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { SectionTemplate as SectionTemplateInterface } from '@interfaces/template/section';

const TemplateContext = createContext<SectionTemplateInterface[]>([]);

const TemplateProvider = ({
	routeId,
	children,
}: {
	routeId?: string;
	children: React.ReactNode | React.ReactNode[];
}) => {
	const [template, setTemplate] = useState<SectionTemplateInterface[]>([]);

	const getTemplate = useCallback(() => {
		if (routeId)
			import(`../../../locales/templates/page.${routeId}.json`)
				.then((json) => setTemplate(json.default))
				.catch((error) => console.error(error));
	}, [routeId]);

	useEffect(() => {
		getTemplate();
	}, [getTemplate]);

	return (
		<TemplateContext.Provider value={template}>
			{children}
		</TemplateContext.Provider>
	);
};
const useTemplate = () => {
	return useContext(TemplateContext);
};
export { TemplateProvider, useTemplate };
