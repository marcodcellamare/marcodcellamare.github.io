import { useTranslation } from 'react-i18next';
import Floating from '@components/Misc/Floating';
import { ReactComponent as Logo } from '@assets/images/portfolio.svg';

const Cover = ({ className = '' }: { className?: string }) => {
	const { i18n } = useTranslation();

	return (
		<div className={`cover position-relative ${className}`.trim()}>
			<h1 hidden={true}>{i18n.t('com:TITLE')}</h1>
			<Floating
				className='position-absolute top-0 bottom-0 start-0 end-0 m-n10 m-sm-0 px-sm-15 px-md-20 py-10'
				ratio={{ x: 130, y: 130 }}>
				<img
					src={
						process.env.PUBLIC_URL +
						'/images/marco-d-cellamare.webp'
					}
					srcSet={
						process.env.PUBLIC_URL +
						'/images/marco-d-cellamare-sm.webp 800w, ' +
						process.env.PUBLIC_URL +
						'/images/marco-d-cellamare.webp 1000w'
					}
					sizes='(max-width: 800px) 800w, 1000w'
					alt={i18n.t('com:NAME')}
					className='object-fit-contain w-100 h-100 opacity-70'
				/>
			</Floating>
			<div className='row position-relative flex-grow-1 align-self-center'>
				<div className='col-12 col-md-auto offset-lg-1 text-center text-md-end align-self-center mb-5 mb-md-0'>
					<h5 className='my-0 text-uppercase lh-1'>
						{i18n.t('com:THE')}
					</h5>
				</div>
				<Floating
					className='col-12 col-md-4 col-lg-4 text-center align-self-center'
					ratio={{ x: 65, y: 65 }}
					perspective={200}
					shadow={'svg'}>
					<Logo className='w-80 w-sm-70 w-md-auto' />
				</Floating>
				<div className='col-12 col-md text-center text-md-start align-self-center mt-5 mt-md-0'>
					<h5 className='mt-0 mb-1 text-uppercase lh-1'>
						{`${i18n.t('com:OF').toLowerCase()} `}
						<strong>{i18n.t('com:NAME')}</strong>
					</h5>
					<h6 className='small my-0 text-uppercase text-dark'>
						{i18n.t('com:ROLE')}
					</h6>
				</div>
			</div>
		</div>
	);
};
export default Cover;
