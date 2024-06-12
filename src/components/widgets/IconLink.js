import React from 'react';
import ReactGA from 'react-ga4';
import { Behance, EnvelopePaper, FileEarmarkPdf, Github, Instagram, Link, Linkedin, Phone } from 'react-bootstrap-icons';

class IconLink extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			href: '',
			icon: <Link />,
			title: ''
		};
		this.onClick = this.onClick.bind(this);
		this.Init = this.Init.bind(this);
	}
	componentDidMount() {
		this.Init();
	}
	onClick() {
		ReactGA.event({
			category: 'Links',
			action: 'Click',
			label: this.state.title
		});
	}
	Init() {
		let link = {};

		switch (this.props.type) {
			case 'phone':
				link = {
					href: 'tel:' + this.props.url,
					icon: <Phone />,
					title: this.props.url
				};
				break;

			case 'email':
				link = {
					href: 'mailto:' + this.props.url,
					icon: <EnvelopePaper />,
					title: this.props.url
				};
				break;

			case 'portfolio':
				link = {
					href: this.props.url,
					icon: <FileEarmarkPdf />,
					title: this.props.Locale.com[this.props.type.toUpperCase()]
				};
				break;

			case 'linkedin':
				link = {
					href: this.props.url,
					icon: <Linkedin />,
					title: this.props.Locale.com[this.props.type.toUpperCase()]
				};
				break;

			case 'github':
				link = {
					href: this.props.url,
					icon: <Github />,
					title: this.props.Locale.com[this.props.type.toUpperCase()]
				};
				break;

			case 'behance':
				link = {
					href: this.props.url,
					icon: <Behance />,
					title: this.props.Locale.com[this.props.type.toUpperCase()]
				};
				break;

			case 'instagram':
				link = {
					href: this.props.url,
					icon: <Instagram />,
					title: this.props.Locale.com[this.props.type.toUpperCase()]
				};
				break;

			default:
				link = {
					href: this.props.url,
					icon: <Link />,
					title: this.props.Locale.com[this.props.type.toUpperCase()]
				};
		}
		this.setState(link);
	}
	render() {
		return <a href={this.state.href ? this.state.href : '#'}
			title={this.state.title}
			className={'link-icon position-relative'
				+ (this.props.className ? ' ' + this.props.className : '')}
			target="_blank"
			rel="noreferrer"
			onClick={this.onClick}>
			<span className="link-icon-icon">
				{this.state.icon}
			</span>
			{this.state.title
				? <span className={'link-icon-title small position-absolute top-0 start-50 translate-middle pe-none text-nowrap fw-bold px-2 py-1 z-1'
					+ (this.props.classNameTitle ? ' ' + this.props.classNameTitle : '')}>
					{this.state.title}
				</span>
				: null}
		</a>
	}
}
export default IconLink;