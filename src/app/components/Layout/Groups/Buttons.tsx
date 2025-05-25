import { useTranslation } from 'react-i18next';
import Link from '../Elements/Link';
import { ButtonTemplate as ButtonTemplateInterface } from '@interfaces/template/button';

const Buttons = ({
	id,
	routeId,
	className = '',
	items = [],
}: {
	id: number;
	routeId: string;
	className?: string;
	items?: ButtonTemplateInterface[];
}) => {
	const { i18n } = useTranslation();

	return items.length > 0 ? (
		<div className={`section-buttons ${className}`.trim()}>
			{items.map((item, k) => {
				return (
					<Link
						key={k}
						navLink={item.navLink}
						type={item.type}
						href={item.url}
						className={`${items.length > 1 ? 'me-1' : ''} ${
							item.className
						}`.trim()}>
						{i18n.t(
							`page.${routeId}:sections.${id}.buttons.${k}.TEXT`
						)}
					</Link>
				);
			})}
		</div>
	) : null;
};
export default Buttons;
