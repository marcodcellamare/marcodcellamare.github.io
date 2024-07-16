import { useEffect, useState } from 'react';
import { SectionTemplate as SectionTemplateInterface } from '@interfaces/template/section';

const useTemplate = (id: string): SectionTemplateInterface[] => {
	const [template, setTemplate] = useState<SectionTemplateInterface[]>([]);

	useEffect(() => {
		if (id)
			import(`../templates/${id}.json`)
				.then((json) => setTemplate(json.default))
				.catch((error) => console.error(error));
	}, [id]);

	return template;
};
export default useTemplate;
