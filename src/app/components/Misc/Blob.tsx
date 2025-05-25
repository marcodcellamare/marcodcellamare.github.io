import React, { useCallback, useEffect, useRef, useState } from 'react';
import blobshape from 'blobshape';
import { v4 as uuidv4 } from 'uuid';
import { useResizing } from '@hooks';
//import '@styles/components/Blob.scss';

const Blob = ({
	children,
	className = '',
}: {
	children: React.ReactNode | React.ReactNode[];
	className?: string;
}) => {
	const preset = {
		_default: 'relaxed',
		relaxed: {
			min: 6,
			max: 9,
			update: 700,
		},
		stressed: {
			min: 9,
			max: 10,
			update: 300,
		},
	};
	const ref = useRef();
	const size = useResizing(ref);
	const [id, setId] = useState(null);
	const [config, setConfig] = useState({
		over: false,
		min: preset[preset._default].min,
		max: preset[preset._default].max,
		update: preset[preset._default].update,
	});
	const [shape, setShape] = useState({ path: '' });
	const [show, setShow] = useState(false);
	const timerShow = useRef<NodeJS.Timeout>(null);
	const timerUpdate = useRef<NodeJS.Timeout>(null);

	// This function will generate the random blob shape

	const generate = useCallback(() => {
		const shape = blobshape({
			size: !size.isResizing ? size.w : 0,
			growth: Math.round(
				Math.random() * (config.max - config.min) + config.min
			),
			edges: 5,
			seed: null,
		});
		setShape(shape);
	}, [config.min, config.max, size.w, size.isResizing]);

	// This function set a different configuration to the blob,
	// when the user hit the shape with the mouse

	const onHover = (over: boolean) => {
		const _default = !over ? 'relaxed' : 'stressed';

		setConfig({
			over: over,
			min: preset[_default].min,
			max: preset[_default].max,
			update: preset[_default].update,
		});
	};

	useEffect(() => {
		setId(uuidv4());
		timerShow.current = setTimeout(() => setShow(true), 500);

		return () => clearInterval(timerShow.current);
	}, []);

	useEffect(() => {
		generate();
		timerUpdate.current = setInterval(() => generate(), config.update);

		return () => clearInterval(timerUpdate.current);
	}, [generate, config.update]);

	return (
		<div
			ref={ref}
			className={`blob${show ? ' show' : ''}${
				config.over ? ' hover' : ''
			} position-relative ${className}`.trim()}>
			{show && shape.path ? (
				<div className='blob-wrapper'>
					<svg
						className='position-absolute top-50 start-50 translate-middle'
						style={{
							width: !size.isResizing ? size.w : 0,
							height: !size.isResizing ? size.w : 0,
						}}
						preserveAspectRatio='none'
						onMouseOver={() => onHover(true)}
						onMouseOut={() => onHover(false)}>
						<path d={shape.path} />
						<clipPath id={id}>
							<path d={shape.path} />
						</clipPath>
					</svg>
					{React.Children.map(children, (child) => {
						// Appending className and styles to the children

						return React.isValidElement(child)
							? React.cloneElement(child as React.ReactElement, {
									className: 'object-fit-contain pe-none',
									hover: config.over,
									style: {
										width: !size.isResizing ? size.w : 0,
										height: !size.isResizing ? size.w : 0,
										clipPath: 'url(#' + id + ')',
									},
							  })
							: child;
					})}
				</div>
			) : null}
		</div>
	);
};
export default Blob;
