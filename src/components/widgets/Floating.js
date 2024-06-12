import React from 'react';

class Floating extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			left: 0,
			top: 0
		};
		this.ref = false;
		this.onMouseMove = this.onMouseMove.bind(this);
	}
	componentDidMount() {
		document.addEventListener('mousemove', this.onMouseMove);
	}
	componentWillUnmount() {
		document.removeEventListener('mousemove', this.onMouseMove);
	}
	onMouseMove(e) {
		if (this.ref)
			this.setState(prevState => {
				return {
					left: this.props.ratioX
						&& this.ref.getBoundingClientRect().top + this.ref.getBoundingClientRect().height > 0
						&& this.ref.getBoundingClientRect().top < window.innerHeight
						? Math.round((this.ref.getBoundingClientRect().left + this.ref.getBoundingClientRect().width / 2 - e.pageX) / this.props.ratioX)
						: prevState.left,
					top: this.props.ratioY
						&& this.ref.getBoundingClientRect().top + this.ref.getBoundingClientRect().height > 0
						&& this.ref.getBoundingClientRect().top < window.innerHeight
						? Math.round((this.ref.getBoundingClientRect().top + this.ref.getBoundingClientRect().height / 2 - e.pageY) / this.props.ratioY)
						: prevState.top
				}
			});
	}
	render() {
		return <div ref={e => this.ref = e}
			className={'floating'
				+ (this.props.className ? ' ' + this.props.className : '')}>
			{React.cloneElement(this.props.children,
				{
					className: (this.props.children.props.className ? this.props.children.props.className : '')
						+ (this.props.classNameChildren ? ' ' + this.props.classNameChildren : ''),
					style: {
						transform:
							(this.state.left ? 'translateX(' + this.state.left + 'px) ' : '')
							+ (this.state.top ? 'translateY(' + this.state.top + 'px) ' : '')
					}
				}
			)}
		</div>
	}
}
export default Floating;