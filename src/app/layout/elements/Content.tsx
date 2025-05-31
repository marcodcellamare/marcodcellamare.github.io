import { Trans, useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';

import Heading from './Heading';

interface ContentProps {
	sectionId: number;
}

const Content = ({ sectionId }: ContentProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);

	return (
		<div className='content'>
			{i18n.exists(`${pageId}:sections.${sectionId}.heading.h1`) ||
			i18n.exists(`${pageId}:sections.${sectionId}.heading.h2`) ||
			i18n.exists(`${pageId}:sections.${sectionId}.heading.h3`) ? (
				<div className='headings border'>
					{i18n.exists(
						`${pageId}:sections.${sectionId}.heading.h1`
					) ? (
						<Heading
							as='h2'
							parallaxProps={{
								translateX: ['50px', '-50px'],
							}}
							className='h1 text-primary'>
							{t(`sections.${sectionId}.heading.h1`)}
						</Heading>
					) : null}
					{i18n.exists(
						`${pageId}:sections.${sectionId}.heading.h2`
					) ? (
						<h3 className='h2 text-secondary'>
							{t(`sections.${sectionId}.heading.h2`)}
						</h3>
					) : null}
					{i18n.exists(
						`${pageId}:sections.${sectionId}.heading.h3`
					) ? (
						<h4 className='h3 text-accent'>
							{t(`sections.${sectionId}.heading.h3`)}
						</h4>
					) : null}
				</div>
			) : null}

			{i18n.exists(`${pageId}:sections.${sectionId}.content`) ? (
				<Trans
					i18nKey={`${pageId}:sections.${sectionId}.content`}
					components={{
						h4: <h5 className='h4 text-accent' />,
						h5: <h6 className='h5 text-accent' />,
						h6: <h6 className='h6 text-accent' />,
					}}
				/>
			) : null}
		</div>
	);
};
export default Content;
