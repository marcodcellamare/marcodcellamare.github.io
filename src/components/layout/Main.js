import React from 'react';
import { Section } from './';

class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			slide: -1
		};
		this.ref = {
			main: {},
			slides: []
		};
		this.timeoutScroll = false;
		this.timeoutEnd = false;
		this.scrollStart = true;

		this.onScroll = this.onScroll.bind(this);
		this.onScrollStart = this.onScrollStart.bind(this);
		this.onScrollEnd = this.onScrollEnd.bind(this);
		this.Set = this.Set.bind(this);
		this.Top = this.Top.bind(this);
		this.Close = this.Close.bind(this);
	}
	componentDidMount() {
		this.Set(0, true);

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

		let newSlide = false;
		this.onScrollStart();

		this.ref.slides.forEach((r, slide) => {
			this.Top(r.ref, slide);
			newSlide = this.Close(r.ref, slide, newSlide);
		});
		this.timeoutEnd = setTimeout(() => {
			this.onScrollEnd(newSlide);
		}, 200);
	}
	onScrollStart() {
		if (this.scrollStart) {
			if (typeof (this.props.onScrollStart) === 'function')
				this.props.onScrollStart(this.state.slide);
		}
		this.scrollStart = false;
	}
	onScrollEnd(ref) {
		clearTimeout(this.timeoutScroll);
		clearTimeout(this.timeoutEnd);

		if (ref !== false)
			this.ref.main.scroll({ top: Math.ceil(ref.offsetTop), behavior: 'smooth' });

		if (typeof (this.props.onScrollEnd) === 'function')
			this.props.onScrollEnd(this.state.slide, ref !== false);

		this.scrollStart = true;
	}
	Set(slide, load, callback) {
		callback = typeof (callback) === 'function' ? callback : () => { };

		this.setState(prevState => {
			if (prevState.slide !== slide) {
				if (typeof (this.props.onSlide) === 'function')
					this.props.onSlide(slide, load);
			}
			return {
				slide: slide
			}
		}, callback);
	}
	Top(ref, slide) {
		// NOTE Slide hits the top

		if (Math.floor(ref.getBoundingClientRect().top - this.ref.main.getBoundingClientRect().top) > -Math.floor(this.ref.main.getBoundingClientRect().height)
			&& Math.floor(ref.getBoundingClientRect().top - this.ref.main.getBoundingClientRect().top) <= 0) {

			this.Set(slide, false, () => {
				if (typeof (this.props.onScroll) === 'function')
					this.props.onScroll(this.state.slide);
			});
		}
	}
	Close(ref, slide, newSlide) {
		// NOTE Slide hits area close to the top

		if (Math.round(ref.getBoundingClientRect().top - this.ref.main.getBoundingClientRect().top) >= -Math.round(this.ref.main.getBoundingClientRect().height / 3)
			&& Math.round(ref.getBoundingClientRect().top - this.ref.main.getBoundingClientRect().top) < Math.round(this.ref.main.getBoundingClientRect().height / 3))
			newSlide = ref;

		return newSlide;
	}
	render() {
		return <main className="flex-grow-1 position-relative">
			{this.props.Locale.pages[this.props.current.page]
				&& this.props.Locale.pages[this.props.current.page].length > 0
				? <div className="main-wrapper position-absolute top-0 bottom-0 start-0 end-0 overflow-hidden overflow-y-auto"
					ref={e => this.ref.main = e}
					onScroll={this.onScroll}>
					{this.props.Locale.pages[this.props.current.page].map((content, slide) => {
						return <Section
							key={slide}
							ref={e => this.ref.slides[slide] = e}
							Locale={this.props.Locale}
							page={this.props.current.page}
							slide={slide}
							sinceDate={this.props.sinceDate} />
					})}
				</div>
				: null}
		</main>
	}
}
export default Main;