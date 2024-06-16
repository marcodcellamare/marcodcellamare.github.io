import React from 'react';
import ReactGA from 'react-ga4';
import { ArrowDownCircle, ArrowRightCircle, ArrowUpRightCircle, Behance, EnvelopePaper, FileEarmarkPdf, Github, Instagram, Linkedin, Phone } from 'react-bootstrap-icons';

class IconLink extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			href: '',
			icon: '',
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
			action: 'click',
			label: this.state.title ? this.state.title : this.state.type
		});
	}
	Init() {
		let link = {};
		let icon = false;
		let href = false;

		if (this.props.url
			&& this.props.url.indexOf('INTERNAL::') === 0) {

			const path = this.props.url.replace('INTERNAL::', '').split('.');
			href = this.props.Locale;

			path.forEach(k => {
				if (href[k])
					href = href[k];
			});
		}
		else
			href = this.props.url;

		switch (this.props.type) {
			case 'link':
				icon = <ArrowUpRightCircle />
				break;

			case 'download':
				icon = <ArrowDownCircle />
				break;

			default:
				icon = <ArrowRightCircle />
		}
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
					href: href,
					icon: icon,
					title: ''
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
			<span className={'link-icon-icon'
				+ (!this.props.iconOnly
					&& this.props.children
					? ' lead me-2'
					: '')}>
				{this.state.icon}
			</span>
			{this.props.iconOnly
				&& this.state.title
				? <span className={'link-icon-title small position-absolute top-0 start-50 translate-middle pe-none text-nowrap fw-bold px-2 py-1 z-1'
					+ (this.props.classNameTitle ? ' ' + this.props.classNameTitle : '')}>
					{this.state.title}
				</span>
				: null}
			{!this.props.iconOnly
				&& this.props.children
				? <strong>
					{this.props.children}
				</strong>
				: null}
		</a>
	}
}
export default IconLink;