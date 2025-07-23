import classNames from 'classnames';

import { RGB } from '@/types/misc';

interface DuotoneProps {
	id: string;
	toAlpha?: boolean;
	bgColor: RGB;
	fgColor: RGB;
	className?: string;
}

const Duotone = ({
	id,
	toAlpha = false,
	bgColor,
	fgColor,
	className,
}: DuotoneProps) => {
	const normalize = (color: number) => (color / 255).toFixed(3);

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className={classNames(['duotone hidden', className])}>
			<filter id={id}>
				{!toAlpha ? (
					<feColorMatrix
						type='matrix'
						values='0.2126 0.7152 0.0722 0 0
								0.2126 0.7152 0.0722 0 0
								0.2126 0.7152 0.0722 0 0
								0      0      0      1 0'
					/>
				) : (
					<>
						<feColorMatrix
							type='matrix'
							values='-1 0 0 0 1
									0 -1 0 0 1
									0 0 -1 0 1
									0 0 0 1 0'
						/>
						<feColorMatrix type='luminanceToAlpha' />
					</>
				)}
				<feComponentTransfer>
					<feFuncR
						type='table'
						tableValues={`${normalize(bgColor[0])} ${normalize(
							fgColor[0]
						)}`}
					/>
					<feFuncG
						type='table'
						tableValues={`${normalize(bgColor[1])} ${normalize(
							fgColor[1]
						)}`}
					/>
					<feFuncB
						type='table'
						tableValues={`${normalize(bgColor[2])} ${normalize(
							fgColor[2]
						)}`}
					/>
				</feComponentTransfer>
			</filter>
			<filter id={`${id}.negative`}>
				<feComponentTransfer>
					<feFuncR
						type='table'
						tableValues='1 0'
					/>
					<feFuncG
						type='table'
						tableValues='1 0'
					/>
					<feFuncB
						type='table'
						tableValues='1 0'
					/>
				</feComponentTransfer>
			</filter>
		</svg>
	);
};

export default Duotone;
