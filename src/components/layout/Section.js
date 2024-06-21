import React from 'react';
import { Pager } from '../widgets';
import { Images, Btns, Content, Counters, Cover, Brands, Periods, Lists } from './SectionFragments';

class Section extends React.Component {
	constructor(props) {
		super(props);

		this.ref = false;
		this.spacer = 'mb-10 mb-md-15';
	}
	render() {
		return <section
			ref={e => this.ref = e}
			className={'d-flex overflow-hidden position-relative section-' + this.props.slide
				+ ' section-' + this.props._.theme}>
			<div className="container position-relative d-flex flex-grow-1 flex-row py-20 py-lg-40 py-xl-50">
				<Pager
					Locale={this.props.Locale}
					slide={this.props.slide} />
				<div className="row flex-grow-1 align-self-center">
					<div className="col">
						{['cover'].includes(this.props._.layout)
							? <Cover
								Locale={this.props.Locale}
								language={this.props.language} />
							: null}
						{!['cover'].includes(this.props._.layout)
							? <div className="section-wrapper row flex-grow-1 position-relative">
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
									<Content
										className={this.spacer}
										Locale={this.props.Locale}
										language={this.props.language}
										slide={this.props.slide}
										_={{
											TITLE: this.props._.TITLE,
											SUBTITLE: this.props._.SUBTITLE,
											TEXT: this.props._.TEXT
										}} />
									<Btns
										className={this.spacer}
										Locale={this.props.Locale}
										language={this.props.language}
										_={this.props._.btns} />
									<Periods
										className={this.spacer}
										Locale={this.props.Locale}
										language={this.props.language}
										_={this.props._.periods} />
									<Lists
										className={this.spacer}
										Locale={this.props.Locale}
										language={this.props.language}
										_={this.props._.lists} />
									<Counters
										className={this.spacer}
										Locale={this.props.Locale}
										language={this.props.language}
										_={this.props._.counters} />
									<Brands
										className={this.spacer}
										Locale={this.props.Locale}
										language={this.props.language}
										_={this.props._.brands} />
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