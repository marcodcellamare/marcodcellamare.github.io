import React from 'react';

class Title extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false
		};
		this.component = 'title';
		this.timeout = false;

		this.onTransitionEnd = this.onTransitionEnd.bind(this);
		this.Show = this.Show.bind(this);
		this.Hide = this.Hide.bind(this);
	}
	componentDidMount() {
		this.Show();
	}
	componentWillUnmount() {
		clearTimeout(this.timeout);
	}
	onTransitionEnd(e) {
		if (e.target.classList.contains(this.component)
			&& e.propertyName === 'opacity') {

			if (e.target.classList.contains('show')) {
				if (typeof (this.props.onShown) === 'function')
					this.props.onShown(this.component);
			}
			else {
				if (typeof (this.props.onHidden) === 'function')
					this.props.onHidden(this.component);
			}
		}
	}
	Show() {
		clearTimeout(this.timeout);

		this.timeout = setTimeout(() => {
			this.setState({
				show: true
			}, () => {
				if (typeof (this.props.onShow) === 'function')
					this.props.onShow(this.component);
			});
		}, 100);
	}
	Hide() {
		clearTimeout(this.timeout);

		this.setState({
			show: false
		}, () => {
			if (typeof (this.props.onHide) === 'function')
				this.props.onHide(this.component);
		});
	}
	render() {
		return this.props.current.title
			? <div className={'title small position-fixed top-50 end-0 translate-middle-y z-3 bg-success text-dark fw-bold px-3 py-1 pe-none text-truncate'
				+ (this.state.show ? ' show' : '')}
				onTransitionEnd={this.onTransitionEnd}>
				{this.props.current.title}
			</div>
			: null
	}
}
export default Title;