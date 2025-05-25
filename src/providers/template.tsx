import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from './router';
import Config from '@config';
import { ItfTemplate } from '@interfaces/template';

const TemplateProvider = ({
	children,
}: {
	children: React.ReactNode | React.ReactNode[];
}) => {
	const { i18n } = useTranslation();
	const { iterate } = useRouter();
	const [sections, setSections] = useState<ItfTemplate[]>([]);

	useEffect(() => {
		const test = i18n.t([`page.Home:sections`], { returnObjects: true });

		console.log(test, iterate());
	}, [i18n]);

	return (
		<TemplateContext.Provider value={{ sections }}>
			{children}
		</TemplateContext.Provider>
	);
};

const TemplateContext = createContext({
	sections: [],
});

const useTemplate = () => {
	return useContext(TemplateContext);
};

export { TemplateProvider, useTemplate };
