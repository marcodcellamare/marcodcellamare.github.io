import React from 'react';
import { Counter } from '../widgets';

class Section extends React.Component {
	constructor(props) {
		super(props);

		this.ref = false;
	}
	render() {
		return <section
			ref={e => this.ref = e}
			className={'d-flex overflow-hidden position-relative section-' + this.props.slide
				+ ' section-' + this.props.Locale.pages[this.props.page][this.props.slide].theme}>
			<div className="container d-flex flex-grow-1 py-20">
				<div className="row flex-grow-1 align-self-center">

					<div className="col-12 col-md-3 col-lg-4 align-self-center">
						IMAGE
					</div>

					<div className={'col-12 col-md-9 col-lg-8 pe-md-20 align-self-center'
						+ (!this.props.Locale.pages[this.props.page][this.props.slide].side || this.props.Locale.pages[this.props.page][this.props.slide].side === 'left'
							? ' order-md-first'
							: '')}>
						{this.props.Locale.pages[this.props.page][this.props.slide].TITLE
							? this.props.slide === 0
								? <h1 className="mt-0 mb-5">
									{this.props.Locale.pages[this.props.page][this.props.slide].TITLE}
								</h1>
								: <h2 className="h1 mt-0 mb-5">
									{this.props.Locale.pages[this.props.page][this.props.slide].TITLE}
								</h2>
							: null}
						{this.props.Locale.pages[this.props.page][this.props.slide].SUBTITLE
							? <p className="lead fw-bold mt-0 mb-5">
								{this.props.Locale.pages[this.props.page][this.props.slide].SUBTITLE}
							</p>
							: null}
						{this.props.Locale.pages[this.props.page][this.props.slide].TEXT
							? <p>
								{this.props.Locale.pages[this.props.page][this.props.slide].TEXT}
							</p>
							: null}

						{this.props.counter
							? <Counter
								Locale={this.props.Locale}
								since={this.props.sinceDate} />
							: null}

					</div>
				</div>
			</div>


			<div className="pager">
				<div className={'pager-polygon pager-polygon-' + (this.props.slide < 8 ? this.props.slide + 1 : 'all')} />
			</div>


		</section>
	}
}
export default Section;