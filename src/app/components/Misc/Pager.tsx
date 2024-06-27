import { useTranslation } from 'react-i18next';
import { Floating } from './';
import '@styles/components/Pager.scss';

const Pager = ({ id }: { id: number }) => {
	const { i18n } = useTranslation();

	return (
		<Floating
			ratio={{ x: 0, y: 30 }}
			className={`pager pager-${
				id <= 8 ? id : 'all'
			} position-absolute top-0 bottom-0`}>
			<div className='pager-wrapper position-absolute start-0'>
				<div className='pager-polygon position-absolute top-50 start-0' />
				{id > 0 ? (
					<div className='pager-title position-relative d-none d-md-block'>
						<h3 className='h6 my-0 small lh-1 text-nowrap text-uppercase'>
							{i18n.t('com.PAGER.0')}
							<br />
							<strong>{i18n.t('com.PAGER.1')}</strong>
						</h3>
					</div>
				) : null}
			</div>
		</Floating>
	);
};
export default Pager;
