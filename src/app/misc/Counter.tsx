import { useTranslation } from 'react-i18next';
import useCounter, { CounterType } from '@/hooks/useCounter';
import classNames from 'classnames';
import { Fragment } from 'react/jsx-runtime';

interface CounterProps {
	date: Date;
	sentenceLike?: boolean;
	className?: string;
	itemClassName?: string;
	itemNumberClassName?: string;
	itemTypeClassName?: string;
	itemSeparatorClassName?: string;
	prefx?: string;
	suffx?: string;
	prefxClassName?: string;
	suffxClassName?: string;
}

const Counter = ({
	date,
	sentenceLike,
	className,
	itemClassName,
	itemNumberClassName,
	itemTypeClassName,
	itemSeparatorClassName,
	prefx,
	suffx,
	prefxClassName,
	suffxClassName,
}: CounterProps) => {
	const { t } = useTranslation();
	const counter = useCounter(date, true);

	if (Object.keys(counter).length === 0) return;

	return (
		<div className={classNames(['counter text-wrap', className])}>
			{prefx && (
				<span
					className={classNames([
						'counter-prefx',
						prefxClassName,
					])}>{`${prefx} `}</span>
			)}
			{(Object.keys(counter) as Partial<keyof CounterType>[]).map(
				(type, k) => (
					<Fragment key={k}>
						<span
							className={classNames([
								'counter-item text-nowrap',
								itemClassName,
							])}>
							<span
								className={classNames([
									'counter-item-number',
									itemNumberClassName,
								])}>
								{counter[type]}
							</span>
							<span
								className={classNames([
									'counter-item-type',
									itemTypeClassName,
								])}>
								{` ${t(`counter.${type}`, {
									count: counter[type],
								}).toLowerCase()}`}
							</span>
							{sentenceLike &&
								k < Object.keys(counter).length - 1 && (
									<span
										className={classNames([
											'counter-item-separator',
											itemSeparatorClassName,
										])}>
										{k < Object.keys(counter).length - 2
											? ', '
											: ` ${t(
													'counter.and'
											  ).toLowerCase()} `}
									</span>
								)}
						</span>{' '}
					</Fragment>
				)
			)}
			{suffx && (
				<span
					className={classNames([
						'counter-suffx',
						suffxClassName,
					])}>{` ${suffx}`}</span>
			)}
		</div>
	);
};
export default Counter;
