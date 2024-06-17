import React from 'react';
import blobshape from 'blobshape';
import { v4 as uuidv4 } from 'uuid';

class Images extends React.Component {
	constructor(props) {
		super(props);

		this.blob = {
			base: 'relaxed',
			relaxed: {
				min: 6,
				max: 9,
				interval: 700
			},
			stressed: {
				min: 9,
				max: 10,
				interval: 300
			}
		};
		this.state = {
			mounted: true,
			over: false,
			blob: {
				shape: false,
				width: 0,
				height: 0,
				status: this.blob.base,
				growth: {
					min: this.blob[this.blob.base].min,
					max: this.blob[this.blob.base].max
				},
				interval: this.blob[this.blob.base].interval
			}
		};
		this.interval = false;
		this.timeout = false;
		this.ref = false;
		this.id = uuidv4();

		this.onHover = this.onHover.bind(this);
		this.onResize = this.onResize.bind(this);
		this.Init = this.Init.bind(this);
		this.BlobShape = this.BlobShape.bind(this);
	}
	componentDidMount() {
		clearInterval(this.interval);
		clearTimeout(this.timeout);

		window.addEventListener('resize', this.onResize);
		window.dispatchEvent(new Event('resize'));

		this.Init();
	}
	componentWillUnmount() {
		clearInterval(this.interval);
		clearTimeout(this.timeout);
		window.removeEventListener('resize', this.onResize);
	}
	onHover(over) {
		const status = !over ? 'relaxed' : 'stressed';

		this.setState(prevState => {
			return {
				over: over,
				blob: {
					...prevState.blob,
					status: status,
					growth: {
						min: this.blob[status].min,
						max: this.blob[status].max
					},
					interval: this.blob[status].interval
				}
			}
		}, this.Init);
	}
	onResize() {
		clearTimeout(this.timeout);

		this.setState({
			mounted: false
		}, () => {
			let width = this.state.blob.width;
			let height = this.state.blob.height;

			if (this.ref) {
				width = Math.floor(this.ref.getBoundingClientRect().width);
				height = Math.floor(this.ref.getBoundingClientRect().height);
			}
			this.timeout = setTimeout(() => {
				this.setState(prevState => {
					return {
						mounted: true,
						blob: {
							...prevState.blob,
							width: width,
							height: height
						}
					}
				});
			}, 200);
		});
	}
	Init() {
		clearInterval(this.interval);
		clearTimeout(this.timeout);
		this.BlobShape();

		this.interval = setInterval(() => {
			this.BlobShape();
		}, this.state.blob.interval);
	}
	BlobShape() {
		if (this.ref
			&& this.props.blob) {
			const shape = blobshape({
				size: this.state.mounted ? this.state.blob.width : 1,
				growth: Math.round(Math.random() * (this.state.blob.growth.max - this.state.blob.growth.min) + this.state.blob.growth.min),
				edges: 5,
				seed: null
			});
			this.setState(prevState => {
				return {
					blob: {
						...prevState.blob,
						shape: shape
					}
				}
			});
		}
	}
	render() {
		return this.props.files
			&& this.props.files.length > 0
			? <div ref={e => this.ref = e}
				className={'section-images position-relative w-100'
					+ (this.state.over ? ' hover' : '')}
				onMouseEnter={e => this.onHover(true)}
				onMouseLeave={e => this.onHover(false)}>
				{this.state.mounted
					? <div className="section-images-wrapper">
						{this.props.blob
							&& this.state.blob.shape
							? <svg
								className="section-images-clip position-absolute top-50 start-50 translate-middle"
								preserveAspectRatio="none"
								style={{
									width: this.state.blob.width,
									height: this.state.blob.width
								}}>
								<path
									d={this.state.blob.shape.path} />
								<clipPath id={this.id}>
									<path
										d={this.state.blob.shape.path} />
								</clipPath>
							</svg>
							: null}
						<div className="section-images-slide position-relative"
							style={this.props.blob
								&& this.state.blob.shape
								? { clipPath: 'url(#' + this.id + ')' }
								: null}>
							{this.props.files.map((image, k) => {
								return <div key={k}
									className="section-images-image"
									style={{
										width: this.state.blob.width,
										height: this.state.blob.width
									}}>
									<img src={process.env.PUBLIC_URL + '/images/' + image.file}
										srcSet={process.env.PUBLIC_URL + '/images/' + image.fileSm + ' 800w, '
											+ process.env.PUBLIC_URL + '/images/' + image.file + ' 1000w'}
										sizes="(max-width: 800px) 800w, 1000w"
										className="object-fit-contain w-100 h-100"
										alt={image.file}
										loading="lazy" />
								</div>
							})}
						</div>
					</div>
					: null}
			</div>
			: null
	}
}
export default Images;