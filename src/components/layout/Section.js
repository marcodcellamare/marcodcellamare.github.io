import React from 'react';
import Brands from '../../assets/images/brands';
import { Counter, Cover, IconLink, Images, Pager } from '../widgets';

class Section extends React.Component {
	constructor(props) {
		super(props);

		this.ref = false;
	}
	render() {
		return <section
			ref={e => this.ref = e}
			className={'d-flex overflow-hidden position-relative section-' + this.props.slide
				+ ' section-' + this.props._.theme}>
			<div className="container position-relative d-flex flex-grow-1 flex-row py-5 py-md-20 py-lg-40 py-xl-50">
				<Pager
					Locale={this.props.Locale}
					slide={this.props.slide} />
				<div className="row flex-grow-1 align-self-center">
					<div className="col">
						{['cover'].includes(this.props._.layout)
							? <Cover
								Locale={this.props.Locale}
								className={this.props._.TITLE
									|| this.props._.SUBTITLE
									|| this.props._.TEXT
									|| (this.props._.counters && this.props._.counters.length > 0)
									|| (this.props._.btns && this.props._.btns.length > 0)
									|| (this.props._.brands && this.props._.brands.length > 0)
									? 'mb-5 mb-md-20'
									: ''} />
							: null}
						{this.props._.TITLE
							|| this.props._.SUBTITLE
							|| this.props._.TEXT
							? <div className="section-content row flex-grow-1 position-relative">
								{!this.props._.layout
									|| ['left', 'right'].includes(this.props._.layout)
									? <div className="col-12 col-md-5 align-self-center mb-10 mb-sm-15 mb-md-0">
										<Images
											blob={this.props._.imageBlob}
											files={this.props._.images} />
									</div>
									: null}
								<div className={'col-12 align-self-center position-relative z-1'
									+ (!this.props._.layout
										|| ['left', 'right'].includes(this.props._.layout)
										? ' col-md-7 pe-md-20 '
										: '')
									+ (!this.props._.layout
										|| ['full'].includes(this.props._.layout)
										? ' col-md-9 col-lg-8'
										: '')
									+ (!this.props._.layout
										|| ['left'].includes(this.props._.layout)
										? ' order-md-first'
										: '')}>
									<div className={'section-content-wrapper'
										+ ((this.props._.counters && this.props._.counters.length > 0)
											|| (this.props._.btns && this.props._.btns.length > 0)
											|| (this.props._.brands && this.props._.brands.length > 0)
											? ' mb-10 mb-md-10'
											: '')}>
										{this.props._.TITLE
											? this.props.slide === 0
												? <h1 className={'display-2 fw-bold'
													+ (this.props._.SUBTITLE
														|| this.props._.TEXT
														? ' mt-0 mb-5'
														: ' my-0')}
													dangerouslySetInnerHTML={{ __html: this.props._.TITLE }} />
												: <h2 className={'display-2 fw-bold'
													+ (this.props._.SUBTITLE
														|| this.props._.TEXT
														? ' mt-0 mb-5'
														: ' my-0')}
													dangerouslySetInnerHTML={{ __html: this.props._.TITLE }} />
											: null}
										{this.props._.SUBTITLE
											? <p className={'lead'
												+ (this.props._.TEXT
													? ' mt-0 mb-5'
													: ' my-0')}
												dangerouslySetInnerHTML={{ __html: this.props._.SUBTITLE }} />
											: null}
										{this.props._.TEXT
											? <p className="my-0"
												dangerouslySetInnerHTML={{ __html: this.props._.TEXT }} />
											: null}
									</div>
									{this.props._.counters
										&& this.props._.counters.length > 0
										? <div className={'section-counters'
											+ (this.props._.btns && this.props._.btns.length > 0
												? ' mb-10 mb-md-10'
												: '')}>
											<div className="row">
												{this.props._.counters.map((counter, k) => {
													return <div key={k}
														className={'col-12'
															+ (counter.colClassName ? ' ' + counter.colClassName : '')}>
														{counter.TITLE
															? <h3 className='mt-0 mb-3'>
																{counter.TITLE}
															</h3>
															: null}
														<Counter
															Locale={this.props.Locale}
															className={counter.className}
															classNamePreBr={counter.classNamePreBr}
															classNamePostBr={counter.classNamePostBr}
															since={counter.since}
															br={counter.br}
															prefx={counter.PREFX}
															suffx={counter.SUFFX} />
													</div>
												})}
											</div>
										</div>
										: null}
									{this.props._.btns
										&& this.props._.btns.length > 0
										? <div className={'section-btns'
											+ (this.props._.brands && this.props._.brands.length > 0
												? ' mb-10 mb-md-10'
												: '')}>
											{this.props._.btns.map((btn, k) => {
												return <IconLink key={k}
													className={btn.className}
													Locale={this.props.Locale}
													iconOnly={false}
													type={btn.type}
													url={btn.url}>
													{btn.TEXT}
												</IconLink>
											})}
										</div>
										: null}
									{this.props._.brands
										&& this.props._.brands.length > 0
										? <div className="section-brands row g-0">
											{this.props._.brands.map((brand, k) => {
												return <div key={k}
													className="col-4 col-sm-3 col-lg-2 d-flex align-items-center justify-content-center">
													<div className="section-brands-logo">
														<Brands
															className="w-100 h-100"
															logo={brand.logo}
															title={brand.NAME} />
														<h3 hidden={true}>
															{brand.NAME}
														</h3>
													</div>
												</div>
											})}
										</div>
										: null}
								</div>
							</div>
							: null}
					</div>
				</div>
			</div>
		</section>
	}
}
export default Section;