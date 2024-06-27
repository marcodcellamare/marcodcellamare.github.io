import { useTranslation } from 'react-i18next';
import { Floating } from './';
import '@styles/components/Pager.scss';

const Pager = ({ id }: { id: number }) => {
	const { i18n } = useTranslation();

	return (
		<div
			className={`pager pager-${
				id <= 8 ? id : 'all'
			} position-absolute top-0 bottom-0`}>
			<div className='pager-wrapper position-absolute start-0'>
				<div className='pager-polygon position-absolute top-50 start-0' />
			</div>
		</div>
	);
};

/*
class Pager extends React.Component {
	render() {
		return (
			<Floating
				className={
					'pager pager-' +
					(this.props.slide <= 8 ? this.props.slide : 'all') +
					' position-absolute top-0 bottom-0'
				}
				ratioY={30}>
				<div className='pager-wrapper position-absolute start-0'>
					<div className='pager-polygon position-absolute top-50 start-0' />
					{this.props.slide > 0 ? (
						<div className='pager-title position-relative d-none d-md-block'>
							<h2 className='h6 my-0 small lh-1 text-nowrap text-uppercase'>
								{this.props.Locale.com.THE}{' '}
								{this.props.Locale.com.PORTFOLIO.toLowerCase()}{' '}
								{this.props.Locale.com.OF.toLowerCase()}
								<br />
								<strong>{this.props.Locale.com.NAME}</strong>
							</h2>
						</div>
					) : null}
				</div>
			</Floating>
		);
	}
}
	*/
export default Pager;
