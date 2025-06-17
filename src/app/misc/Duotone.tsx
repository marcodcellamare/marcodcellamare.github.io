import classNames from 'classnames';

import { RGB } from '!/types/misc';

interface DuotoneProps {
	id: string;
	bgColor: RGB;
	fgColor: RGB;
	className?: string;
}

const Duotone = ({ id, bgColor, fgColor, className = '' }: DuotoneProps) => {
	const convert255to1 = (color: number) => color / 255;

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className={classNames(['duotone hidden', className])}>
			<filter id={id}>
				<feColorMatrix
					type='matrix'
					values='1 0 0 0 0
							1 0 0 0 0
							1 0 0 0 0
							0 0 0 1 0'
				/>
				<feComponentTransfer
					color-interpolation-filters='sRGB'
					result='duotone'>
					<feFuncR
						type='table'
						tableValues={`${convert255to1(
							bgColor[0]
						)} ${convert255to1(fgColor[0])}`}
					/>
					<feFuncG
						type='table'
						tableValues={`${convert255to1(
							bgColor[1]
						)} ${convert255to1(fgColor[1])}`}
					/>
					<feFuncB
						type='table'
						tableValues={`${convert255to1(
							bgColor[2]
						)} ${convert255to1(fgColor[2])}`}
					/>
				</feComponentTransfer>
			</filter>
		</svg>
	);
};

export default Duotone;
