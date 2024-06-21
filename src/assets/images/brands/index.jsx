import React from 'react';

import { ReactComponent as Adecco } from './adecco.svg';
import { ReactComponent as AeroportiDiPuglia } from './aeroporti-di-puglia.svg';
import { ReactComponent as Anas } from './anas.svg';
import { ReactComponent as BancaPopolareDiBari } from './banca-popolare-di-bari.svg';
import { ReactComponent as Bat } from './bat.svg';
import { ReactComponent as ComuneDiBari } from './comune-di-bari.svg';
import { ReactComponent as DanskRetursystem } from './dansk-retursystem.svg';
import { ReactComponent as DiLeo } from './dileo.svg';
import { ReactComponent as Framesi } from './framesi.svg';
import { ReactComponent as GasNatural } from './gas-natural.svg';
import { ReactComponent as Jalatte } from './jalatte.svg';
import { ReactComponent as LakridsByBulow } from './lakrids-by-bulow.svg';
import { ReactComponent as Legambiente } from './legambiente.svg';
import { ReactComponent as Lotto } from './lotto.svg';
import { ReactComponent as Mongolfiera } from './mongolfiera.svg';
import { ReactComponent as Natuzzi } from './natuzzi.svg';
import { ReactComponent as NewYorkYankees } from './new-york-yankees.svg';
import { ReactComponent as RegionePuglia } from './regione-puglia.svg';
import { ReactComponent as Telcom } from './telcom.svg';
import { ReactComponent as Volvo } from './volvo.svg';

class Brands extends React.Component {
	constructor(props) {
		super(props);
		this.Logo = this.Logo.bind(this);
	}
	Logo() {
		const params = {
			className: this.props.className,
			style: this.props.style,
			title: this.props.title,
		};
		switch (this.props.logo) {
			case 'Adecco':
				return <Adecco {...params} />;

			case 'AeroportiDiPuglia':
				return <AeroportiDiPuglia {...params} />;

			case 'Anas':
				return <Anas {...params} />;

			case 'BancaPopolareDiBari':
				return <BancaPopolareDiBari {...params} />;

			case 'Bat':
				return <Bat {...params} />;

			case 'ComuneDiBari':
				return <ComuneDiBari {...params} />;

			case 'DanskRetursystem':
				return <DanskRetursystem {...params} />;

			case 'DiLeo':
				return <DiLeo {...params} />;

			case 'Framesi':
				return <Framesi {...params} />;

			case 'GasNatural':
				return <GasNatural {...params} />;

			case 'Jalatte':
				return <Jalatte {...params} />;

			case 'LakridsByBulow':
				return <LakridsByBulow {...params} />;

			case 'Legambiente':
				return <Legambiente {...params} />;

			case 'Lotto':
				return <Lotto {...params} />;

			case 'Mongolfiera':
				return <Mongolfiera {...params} />;

			case 'Natuzzi':
				return <Natuzzi {...params} />;

			case 'NewYorkYankees':
				return <NewYorkYankees {...params} />;

			case 'RegionePuglia':
				return <RegionePuglia {...params} />;

			case 'Telcom':
				return <Telcom {...params} />;

			case 'Volvo':
				return <Volvo {...params} />;

			default:
		}
	}
	render() {
		return this.Logo();
	}
}
export default Brands;
