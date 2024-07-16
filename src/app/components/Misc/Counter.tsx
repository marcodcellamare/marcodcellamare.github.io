import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCounter } from '@hooks';

const Counter = ({
	since,
	newLineAt,
	className = '',
	classNamePre = '',
	classNamePost = '',
	prefx = '',
	suffx = '',
}: {
	since: string;
	newLineAt?: string;
	className?: string;
	classNamePre?: string;
	classNamePost?: string;
	prefx?: string;
	suffx?: string;
}) => {
	const { i18n } = useTranslation();
	const [types, setTypes] = useState([]);
	const [show, setShow] = useState([]);
	const [newLineAtIdx, setNewLineAtIdx] = useState(-1);
	const counter = useCounter(since);

	useEffect(() => {
		// Set the show array with the counter's keys of the items that are > 0
		setShow(Object.keys(counter).filter((type) => counter[type] > 0));
		setTypes(Object.keys(counter));
	}, [counter]);

	useEffect(() => {
		if (!newLineAt || types.length === 0 || !types.includes(newLineAt))
			return;

		let index = 0;

		do {
			// Find the index that will go on the new line
			index = types.indexOf(newLineAt);
		} while (index === -1);

		// Set the new line index and the types that will go on the new line
		setNewLineAtIdx(index);
	}, [types, show, newLineAt]);

	return show.length > 0 ? (
		<p className={`counter ${className}`.trim()}>
			{prefx ? (
				<span
					className={`counter-item counter-item-prefx ${classNamePre}`.trim()}>
					{prefx + ' '}
				</span>
			) : null}
			{show.map((type, k) => {
				return (
					<React.Fragment key={k}>
						<span
							className={`counter-item counter-item-${
								show.indexOf(type) <= newLineAtIdx ||
								newLineAtIdx === -1
									? 'pre'
									: 'post'
							} counter-item-count counter-item-count-${k} counter-item-count-${type} ${
								show.indexOf(type) <= newLineAtIdx ||
								newLineAtIdx === -1
									? classNamePre
									: ''
							}${
								show.indexOf(type) > newLineAtIdx
									? classNamePost
									: ''
							}`.trim()}>
							<span className='counter-item-number'>
								{counter[type]}
							</span>
							<span className='counter-item-text'>
								{' ' +
									i18n
										.t(`com:${type.toUpperCase()}`, {
											count: counter[type],
										})
										.toLowerCase()}
							</span>
							<span className='counter-item-separator'>
								{k < show.length - 2
									? ', '
									: k === show.length - 2
									? ` ${i18n.t('com:AND').toLowerCase()} `
									: !suffx
									? '.'
									: null}
							</span>
						</span>
						{show.indexOf(type) === newLineAtIdx ? (
							<br className='counter-item-newline' />
						) : null}
					</React.Fragment>
				);
			})}
			{suffx ? (
				<span
					className={`counter-item counter-item-suffx ${
						newLineAtIdx === -1 ? classNamePre : classNamePost
					}`.trim()}>
					{` ${suffx}.`}
				</span>
			) : null}
		</p>
	) : null;
};
export default Counter;
