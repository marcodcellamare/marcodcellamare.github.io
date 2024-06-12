import React from 'react';
import { Counter, Cover, Pager } from '../widgets';

class Section extends React.Component {
	constructor(props) {
		super(props);

		this.ref = false;
	}
	render() {
		let section = false;

		if (this.props.Locale.pages[this.props.page]
			&& this.props.Locale.pages[this.props.page].sections
			&& this.props.Locale.pages[this.props.page].sections.length > 0)
			section = this.props.Locale.pages[this.props.page].sections[this.props.slide];

		return section
			? <section
				ref={e => this.ref = e}
				className={'d-flex overflow-hidden position-relative section-' + this.props.slide
					+ ' section-' + section.theme}>
				<div className="container position-relative d-flex flex-grow-1 flex-row py-5 py-md-20 py-lg-40 py-xl-50">
					<Pager
						slide={this.props.slide} />
					<div className="row flex-grow-1 align-self-center">
						<div className="col">
							{['cover'].includes(section.layout)
								? <Cover
									Locale={this.props.Locale}
									className={section.TITLE
										|| section.SUBTITLE
										|| section.TEXT
										|| (section.counters
											&& section.counters.length > 0)
										? 'mb-5 mb-md-20'
										: ''} />
								: null}
							{section.TITLE
								|| section.SUBTITLE
								|| section.TEXT
								? <div className={'row flex-grow-1 position-relative'
									+ (section.counters
										&& section.counters.length > 0
										? ' mb-5 mb-md-20'
										: '')}>
									{!section.layout
										|| ['left', 'right'].includes(section.layout)
										? <div className="col-12 col-md-3 col-lg-4 align-self-center">
											{section.images
												&& section.images.length > 0
												? <div>
													IMAGE
													{/* NOTE lazy loading
														<img loading="lazy" src="image.jpg" alt="..." />
													*/}
												</div>
												: null}
										</div>
										: null}
									<div className={'col-12 col-md-9 col-lg-8 pe-md-20 align-self-center'
										+ (!section.layout
											|| ['left'].includes(section.layout)
											? ' order-md-first'
											: '')}>
										{section.TITLE
											? this.props.slide === 0
												? <h1 className={'display-2 fw-bold'
													+ (section.SUBTITLE
														|| section.TEXT
														? ' mt-0 mb-5'
														: '')}
													dangerouslySetInnerHTML={{ __html: section.TITLE }} />
												: <h2 className={'display-2 fw-bold'
													+ (section.SUBTITLE
														|| section.TEXT
														? ' mt-0 mb-5'
														: '')}
													dangerouslySetInnerHTML={{ __html: section.TITLE }} />
											: null}
										{section.SUBTITLE
											? <p className={'lead'
												+ (section.TEXT
													? 'mt-0 mb-5'
													: '')}
												dangerouslySetInnerHTML={{ __html: section.SUBTITLE }} />
											: null}
										{section.TEXT
											? <p className="my-0"
												dangerouslySetInnerHTML={{ __html: section.TEXT }} />
											: null}
									</div>
								</div>
								: null}
							{section.counters
								&& section.counters.length > 0
								? <div className="row position-relative">
									{section.counters.map((counter, k) => {
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
								: null}
						</div>
					</div>
				</div>
			</section>
			: null
	}
}
export default Section;