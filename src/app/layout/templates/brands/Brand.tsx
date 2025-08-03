import classNames from 'classnames';
import Icon from './Icon';

interface BrandProps {
	name: string;
	title: string;
	className?: string;
}

const Brand = ({ name, title, className }: BrandProps) => (
	<div className={classNames(['brand group', className])}>
		<Icon
			name={name}
			className='absolute top-1/2 left-1/2 -translate-1/2 w-9/10 h-6/10 fill-(--color-theme-content) transition-[filter,scale] duration-1000 ease-in-out group-hover:blur-xs group-hover:scale-200'
		/>
		<h4 className='absolute border top-1/2 -left-10 -right-10 translate-y-3 px-2 py-1 text-xs uppercase font-black text-(--color-theme-link) text-center transition-[opacity,translate] duration-400 ease-in-out delay-100 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1/2'>
			{title}
		</h4>
	</div>
);
export default Brand;
