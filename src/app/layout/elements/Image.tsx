import { useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';
import classNames from 'classnames';
import Blob from '!/app/misc/Blob';

interface ImageProps {
	rootKey: string;
	className?: string;
}

const Image = ({ rootKey, className = '' }: ImageProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);

	const imageExists = i18n.exists(rootKey, {
		ns: pageId,
	});

	if (!imageExists) return null;

	return (
		<div
			className={classNames(['image relative', className])}
			style={{ filter: 'drop-shadow(0 0.5rem 1rem rgba(0,0,0,0.2))' }}>
			<Blob
				mask='--ciao'
				className='absolute top-1/2 left-1/2 -translate-1/2 w-100 h-100'
			/>
			<img
				src={t(`${rootKey}.src`)}
				className='w-full max-w-none pointer-events-none'
				style={{
					clipPath: 'url(#ciao)',
				}}
			/>
		</div>
	);
};
export default Image;
