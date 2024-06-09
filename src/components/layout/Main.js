import React from 'react';
import { Section } from './';

class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			slides: {
				top: -1,
				center: -1
			}
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
		this.Init = this.Init.bind(this);
		this.Clear = this.Clear.bind(this);
		this.Top = this.Top.bind(this);
		this.Center = this.Center.bind(this);
		this.Close = this.Close.bind(this);
	}
	componentDidMount() {
		this.Init();
	}
	componentWillUnmount() {
		this.Clear();
	}
	onScroll() {
		this.Clear();

		let newSlide = false;
		this.onScrollStart();

		this.ref.slides.forEach((r, slide) => {
			this.Top(r.ref, slide, false);
			this.Center(r.ref, slide, false);
			newSlide = this.Close(r.ref, slide, newSlide);
		});
		if (typeof (this.props.onScroll) === 'function')
			this.props.onScroll(this.state.slides);

		this.timeoutEnd = setTimeout(() => {
			this.onScrollEnd(newSlide);
		}, 200);
	}
	onScrollStart() {
		if (this.scrollStart) {
			if (typeof (this.props.onScrollStart) === 'function')
				this.props.onScrollStart(this.state.slides);
		}
		this.scrollStart = false;
	}
	onScrollEnd(ref) {
		this.Clear();

		if (ref !== false)
			this.ref.main.scroll({ top: Math.ceil(ref.offsetTop), behavior: 'smooth' });

		if (typeof (this.props.onScrollEnd) === 'function')
			this.props.onScrollEnd(this.state.slides, ref !== false);

		this.scrollStart = true;
	}
	Init() {
		this.Clear();

		if (this.ref.main
			&& this.ref.slides[0]) {
			this.Top(this.ref.slides[0].ref, 0, true);
			this.Center(this.ref.slides[0].ref, 0, true);
			this.ref.main.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}
	Clear() {
		clearTimeout(this.timeoutScroll);
		clearTimeout(this.timeoutEnd);
	}
	Top(ref, slide, load) {
		// NOTE Slide hits the top

		if (Math.floor(ref.getBoundingClientRect().top - this.ref.main.getBoundingClientRect().top) > -Math.floor(this.ref.main.getBoundingClientRect().height)
			&& Math.floor(ref.getBoundingClientRect().top - this.ref.main.getBoundingClientRect().top) <= 0) {

			this.setState(prevState => {
				if (prevState.slides.top !== slide) {
					if (typeof (this.props.onSlide) === 'function')
						this.props.onSlide(slide, load);

					return {
						slides: {
							...prevState.slides,
							top: slide
						}
					}
				}
			});
		}
	}
	Center(ref, slide, load) {
		// NOTE Slide hits the center

		if (Math.round(ref.getBoundingClientRect().top - this.ref.main.getBoundingClientRect().top) >= -Math.round(this.ref.main.getBoundingClientRect().height / 2)
			&& Math.round(ref.getBoundingClientRect().top - this.ref.main.getBoundingClientRect().top) < Math.round(this.ref.main.getBoundingClientRect().height / 2)) {

			this.setState(prevState => {
				if (prevState.slides.center !== slide) {
					if (typeof (this.props.onSlideCenter) === 'function')
						this.props.onSlideCenter(slide, load);

					return {
						slides: {
							...prevState.slides,
							center: slide
						}
					}
				}
			});
		}
	}
	Close(ref, slide, newSlide, callback) {
		// NOTE Slide hits area close to the top

		callback = typeof (callback) === 'function' ? callback : () => { };

		if (Math.round(ref.getBoundingClientRect().top - this.ref.main.getBoundingClientRect().top) >= -Math.round(this.ref.main.getBoundingClientRect().height / 3)
			&& Math.round(ref.getBoundingClientRect().top - this.ref.main.getBoundingClientRect().top) < Math.round(this.ref.main.getBoundingClientRect().height / 3)) {
			newSlide = ref;
			callback(slide, newSlide);
		}
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