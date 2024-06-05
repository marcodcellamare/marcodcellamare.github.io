import React from 'react';
import { Counter } from '../widgets';

class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			slide: 0
		};
		this.ref = {
			main: {},
			slides: []
		};
		this.timeoutScroll = false;
		this.timeoutEnd = false;
		this.onScroll = this.onScroll.bind(this);
		this.onScrollEnd = this.onScrollEnd.bind(this);
	}
	componentDidMount() {
		if (typeof (this.props.onSlide) === 'function')
			this.props.onSlide(this.state.slide);

		if (this.ref.main)
			this.ref.main.scrollTo({ top: 0, behavior: 'smooth' });
	}
	componentWillUnmount() {
		clearTimeout(this.timeoutScroll);
		clearTimeout(this.timeoutEnd);
	}
	onScroll() {
		clearTimeout(this.timeoutScroll);
		clearTimeout(this.timeoutEnd);

		this.ref.slides.forEach((ref, slide) => {
			if (Math.round(ref.getBoundingClientRect().top) >= -Math.round(ref.getBoundingClientRect().height / 2)
				&& Math.round(ref.getBoundingClientRect().top) < Math.round(ref.getBoundingClientRect().height / 2)) {
				this.setState(prevState => {
					if (prevState.slide !== slide) {
						if (typeof (this.props.onSlide) === 'function')
							this.props.onSlide(slide);

						return {
							slide: slide
						}
					}
				});
			}
			if (Math.round(ref.getBoundingClientRect().top) > -Math.round(ref.getBoundingClientRect().height)
				&& Math.round(ref.getBoundingClientRect().top) <= this.ref.main.getBoundingClientRect().top) {

				// TODO onSlideTop

				if (typeof (this.props.onSlideTop) === 'function')
					this.props.onSlideTop(slide);
			}
		});
		this.timeoutEnd = setTimeout(() => {
			this.onScrollEnd();
		}, 200);
		this.timeoutScroll = setTimeout(() => {
			if (typeof (this.props.onScroll) === 'function')
				this.props.onScroll(this.state.slide);
		}, 50);
	}
	onScrollEnd() {
		clearTimeout(this.timeoutEnd);
		clearTimeout(this.timeoutScroll);

		let newSlide = false;

		this.ref.slides.forEach(ref => {
			if (Math.round(ref.getBoundingClientRect().top) >= -Math.round(ref.getBoundingClientRect().height / 4)
				&& Math.round(ref.getBoundingClientRect().top) < Math.round(ref.getBoundingClientRect().height / 4)) {
				newSlide = true;
				ref.scrollIntoView({ behavior: 'smooth' });
			}
		});
		if (typeof (this.props.onScrollEnd) === 'function')
			this.props.onScrollEnd(this.state.slide, newSlide);
	}
	render() {
		return <main className="flex-grow-1 position-relative">

			{this.props.Locale.pages[this.props.current.page]
				&& this.props.Locale.pages[this.props.current.page].length > 0
				? <div className="main-wrapper position-absolute top-0 bottom-0 start-0 end-0 overflow-hidden overflow-y-auto"
					ref={e => this.ref.main = e}
					onScroll={this.onScroll}>

					{this.props.Locale.pages[this.props.current.page].map((content, slide) => {

						return <section key={slide}
							ref={e => this.ref.slides[slide] = e}
							className={'d-flex overflow-hidden section-' + slide + ' section-' + content.theme}>
							<div className="container d-flex flex-grow-1 py-20">
								<div className="row flex-grow-1 align-self-center">

									<div className="col-12 col-md-3 col-lg-4 align-self-center">
										IMAGE
									</div>

									<div className={'col-12 col-md-9 col-lg-8 pe-md-20 align-self-center'
										+ (!content.side || content.side === 'left'
											? ' order-md-first'
											: '')}>
										{content.TITLE
											? slide === 0
												? <h1 className="mt-0 mb-5">
													{content.TITLE}
												</h1>
												: <h2 className="h1 mt-0 mb-5">
													{content.TITLE}
												</h2>
											: null}
										{content.SUBTITLE
											? <p className="lead fw-bold mt-0 mb-5">
												{content.SUBTITLE}
											</p>
											: null}
										{content.TEXT
											? <p>
												{content.TEXT}
											</p>
											: null}

										{content.counter
											? <Counter
												Locale={this.props.Locale}
												since={this.props.sinceDate} />
											: null}


									</div>
								</div>
							</div>
						</section>
					})}


				</div>
				: null}
		</main>

	}
}
export default Main;