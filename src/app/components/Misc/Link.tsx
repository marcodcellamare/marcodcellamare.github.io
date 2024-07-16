import React from 'react';
import { NavLink } from 'react-router-dom';
import ReactGA from 'react-ga4';
import {
	ArrowDownCircle,
	ArrowRightCircle,
	ArrowUpRightCircle,
	Behance,
	EnvelopePaper,
	FileEarmarkPdf,
	Github,
	Instagram,
	Linkedin,
	Phone,
} from 'react-bootstrap-icons';
import '@styles/components/Link.scss';

const Link = ({
	type,
	label,
	href,
	navLink = false,
	className = '',
	classNameIcon = '',
	classNameLabel = '',
	classNameText = '',
	children,
}: {
	type: string;
	label?: string;
	href: string;
	navLink?: boolean;
	className?: string;
	classNameIcon?: string;
	classNameLabel?: string;
	classNameText?: string;
	children?: React.ReactNode | React.ReactNode[];
}) => {
	const TagName = navLink ? NavLink : 'a';
	const url = () => {
		switch (type) {
			case 'phone':
				return 'tel:' + href;
			case 'email':
				return 'mailto:' + href;
			default:
				return href;
		}
	};
	const onClick = () => {
		ReactGA.event({
			category: 'Links',
			action: 'click',
			label: label || type,
		});
	};
	return (
		<TagName
			to={navLink ? url() : null}
			href={!navLink ? url() : null}
			target={!navLink ? '_blank' : null}
			rel={!navLink ? 'nofollow' : null}
			className={`link link-underline-opacity-0 position-relative ${className}`.trim()}
			title={label}
			onClick={onClick}>
			<span
				className={`link-icon${
					children ? ' lead me-2' : ''
				} ${classNameIcon}`.trim()}>
				<Icon type={type} />
			</span>
			{children ? (
				<span className={`link-text ${classNameText}`.trim()}>
					{children}
				</span>
			) : null}
			<span
				className={`link-title small position-absolute top-0 start-50 translate-middle pe-none text-nowrap fw-bold px-2 py-1 z-1 ${classNameLabel}`.trim()}>
				{label}
			</span>
		</TagName>
	);
};
const Icon = ({ type }: { type: string }) => {
	switch (type) {
		case 'link':
			return <ArrowUpRightCircle />;
		case 'download':
			return <ArrowDownCircle />;
		case 'phone':
			return <Phone />;
		case 'email':
			return <EnvelopePaper />;
		case 'portfolio':
			return <FileEarmarkPdf />;
		case 'linkedin':
			return <Linkedin />;
		case 'github':
			return <Github />;
		case 'behance':
			return <Behance />;
		case 'instagram':
			return <Instagram />;
		default:
			return <ArrowRightCircle />;
	}
};
export default Link;
