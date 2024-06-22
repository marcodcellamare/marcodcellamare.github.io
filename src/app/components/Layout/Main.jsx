import React from 'react';
import { Section } from '../Section';

class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			slides: {
				top: -1,
				center: -1,
			},
		};
		this.ref = {
			main: false,
			slides: [],
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
	componentDidUpdate(prevProps) {
		if (
			prevProps !== this.props &&
			prevProps.location &&
			this.props.location &&
			prevProps.location.page !== this.props.location.page
		)
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
			if (r) {
				this.Top(r.ref, slide, false);
				this.Center(r.ref, slide, false);
				newSlide = this.Close(r.ref, slide, newSlide);
			}
		});
		if (typeof this.props.onScroll === 'function')
			this.props.onScroll(this.state.slides);

		this.timeoutEnd = setTimeout(() => {
			this.onScrollEnd(newSlide);
		}, 200);
	}
	onScrollStart() {
		if (this.scrollStart) {
			if (typeof this.props.onScrollStart === 'function')
				this.props.onScrollStart(this.state.slides);
		}
		this.scrollStart = false;
	}
	onScrollEnd(ref) {
		this.Clear();

		if (ref !== false)
			this.ref.main.scroll({
				top: Math.ceil(ref.offsetTop),
				behavior: 'smooth',
			});

		if (typeof this.props.onScrollEnd === 'function')
			this.props.onScrollEnd(this.state.slides, ref !== false);

		this.scrollStart = true;
	}
	Init() {
		this.Clear();

		if (
			this.ref.main &&
			this.ref.slides.length > 0 &&
			this.ref.slides[0] &&
			this.ref.slides[0].ref
		) {
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

		if (
			ref &&
			Math.floor(
				ref.getBoundingClientRect().top -
					this.ref.main.getBoundingClientRect().top
			) > -Math.floor(this.ref.main.getBoundingClientRect().height) &&
			Math.floor(
				ref.getBoundingClientRect().top -
					this.ref.main.getBoundingClientRect().top
			) <= 0
		) {
			this.setState((prevState) => {
				if (typeof this.props.onSlide === 'function')
					this.props.onSlide(slide, load);

				if (prevState.slides.top !== slide) {
					return {
						slides: {
							...prevState.slides,
							top: slide,
						},
					};
				}
			});
		}
	}
	Center(ref, slide, load) {
		// NOTE Slide hits the center

		const split = 2;

		if (
			ref &&
			Math.round(
				ref.getBoundingClientRect().top -
					this.ref.main.getBoundingClientRect().top
			) >=
				-Math.round(
					this.ref.main.getBoundingClientRect().height / split
				) &&
			Math.round(
				ref.getBoundingClientRect().top -
					this.ref.main.getBoundingClientRect().top
			) < Math.round(this.ref.main.getBoundingClientRect().height / split)
		) {
			this.setState((prevState) => {
				if (typeof this.props.onSlideCenter === 'function')
					this.props.onSlideCenter(slide, load);

				if (prevState.slides.center !== slide) {
					return {
						slides: {
							...prevState.slides,
							center: slide,
						},
					};
				}
			});
		}
	}
	Close(ref, slide, newSlide) {
		// NOTE Slide hits area close to the top

		const split = 3;

		if (
			ref &&
			Math.round(
				ref.getBoundingClientRect().top -
					this.ref.main.getBoundingClientRect().top
			) >=
				-Math.round(
					this.ref.main.getBoundingClientRect().height / split
				) &&
			Math.round(
				ref.getBoundingClientRect().top -
					this.ref.main.getBoundingClientRect().top
			) <
				Math.round(
					this.ref.main.getBoundingClientRect().height / split
				) &&
			Math.round(ref.getBoundingClientRect().height) <=
				Math.round(this.ref.main.getBoundingClientRect().height)
		) {
			newSlide = ref;
		}
		return newSlide;
	}
	render() {
		return (
			<main className='flex-grow-1 position-relative'>
				{this.props.Locale.pages[this.props.current.page] &&
				this.props.Locale.pages[this.props.current.page].sections &&
				this.props.Locale.pages[this.props.current.page].sections
					.length > 0 ? (
					<div
						className='main-wrapper position-absolute top-0 bottom-0 start-0 end-0 overflow-hidden overflow-y-auto'
						ref={(e) => {
							if (e && this.ref.main !== e) {
								this.ref.main = e;

								this.Init();
							}
						}}
						onScroll={this.onScroll}>
						{this.props.Locale.pages[
							this.props.current.page
						].sections.map((content, slide) => {
							return (
								<Section
									key={slide}
									ref={(e) => {
										if (e && this.ref.slides[slide] !== e) {
											this.ref.slides[slide] = e;

											this.Init();
										}
									}}
									Locale={this.props.Locale}
									language={this.props.language}
									slide={slide}
									slides={
										this.props.Locale.pages[
											this.props.current.page
										].sections.length
									}
									_={content}
								/>
							);
						})}
					</div>
				) : null}
			</main>
		);
	}
}
export default Main;
