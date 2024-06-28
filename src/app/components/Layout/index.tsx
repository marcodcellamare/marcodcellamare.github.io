import RoutesTreeInterface from '@interfaces/routesTree';
import { useTemplate } from '@hooks';
import Main from './Main';
import Footer from './Footer';

const Layout = ({ route }: { route: RoutesTreeInterface }) => {
	const template = useTemplate(route.id || '');

	if (template.length === 0) return null;

	return (
		<div className='app d-flex position-absolute top-0 bottom-0 start-0 end-0 overflow-hidden'>
			<div className='d-flex flex-column flex-grow-1'>
				<Main
					route={route}
					template={template}
				/>
				<Footer
				//Locale={this.state.Locale}
				//language={this.state.language}
				/>
			</div>
		</div>
	);
};
export default Layout;
