import { useTranslation } from 'react-i18next';

const Default = ({
	layout = 'left',
	className = '',
	children,
}: {
	layout?: string;
	className?: string;
	children: React.ReactNode;
}) => {
	const { i18n } = useTranslation();

	return (
		<div className={`default row ${className}`.trim()}>
			<div className='col d-flex'>
				<div className='section-wrapper row flex-grow-1 position-relative'>
					{['left', 'right'].includes(layout) ? (
						<div className='col-12 col-md-5 align-self-center mb-10 mb-sm-15 mb-md-0'>
							{/*
								<Images
											images={template[id].images}
											blob={template[id].imageBlob}
										/>
								*/}
							IMAGES
						</div>
					) : null}
					<div
						className={
							'col-12 align-self-center position-relative z-1' +
							(['left', 'right'].includes(layout)
								? ' col-md-7 pe-md-20'
								: '') +
							(['full'].includes(layout)
								? ' col-md-10 col-lg-8'
								: '') +
							(['left'].includes(layout) ? ' order-md-first' : '')
						}>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Default;
