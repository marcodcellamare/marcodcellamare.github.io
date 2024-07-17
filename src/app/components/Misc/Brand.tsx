import React from 'react';
import { ReactComponent as Adecco } from '@assets/images/brands/adecco.svg';
import { ReactComponent as AeroportiDiPuglia } from '@assets/images/brands/aeroporti-di-puglia.svg';
import { ReactComponent as ANAS } from '@assets/images/brands/anas.svg';
import { ReactComponent as BancaPopolareDiBari } from '@assets/images/brands/banca-popolare-di-bari.svg';
import { ReactComponent as BAT } from '@assets/images/brands/bat.svg';
import { ReactComponent as ComuneDiBari } from '@assets/images/brands/comune-di-bari.svg';
import { ReactComponent as DanskRetursystem } from '@assets/images/brands/dansk-retursystem.svg';
import { ReactComponent as DiLeo } from '@assets/images/brands/dileo.svg';
import { ReactComponent as Framesi } from '@assets/images/brands/framesi.svg';
import { ReactComponent as GasNatural } from '@assets/images/brands/gas-natural.svg';
import { ReactComponent as LakridsByBulow } from '@assets/images/brands/lakrids-by-bulow.svg';
import { ReactComponent as Legambiente } from '@assets/images/brands/legambiente.svg';
import { ReactComponent as Lotto } from '@assets/images/brands/lotto.svg';
import { ReactComponent as Mongolfiera } from '@assets/images/brands/mongolfiera.svg';
import { ReactComponent as Natuzzi } from '@assets/images/brands/natuzzi.svg';
import { ReactComponent as NewYorkYankees } from '@assets/images/brands/new-york-yankees.svg';
import { ReactComponent as RegionePuglia } from '@assets/images/brands/regione-puglia.svg';
import { ReactComponent as Volvo } from '@assets/images/brands/volvo.svg';

const components = {
	Adecco,
	AeroportiDiPuglia,
	ANAS,
	BancaPopolareDiBari,
	BAT,
	ComuneDiBari,
	DanskRetursystem,
	DiLeo,
	Framesi,
	GasNatural,
	LakridsByBulow,
	Legambiente,
	Lotto,
	Mongolfiera,
	Natuzzi,
	NewYorkYankees,
	RegionePuglia,
	Volvo,
};
const Brand = ({
	name,
	className = '',
	style,
}: {
	name: string;
	className?: string;
	style?: React.CSSProperties;
}) => {
	const componentName = (): string => {
		return name
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
				return word.toUpperCase();
			})
			.replace(/\s+/g, '');
	};
	const logo = (): React.ReactElement => {
		const component = componentName();

		return React.createElement(
			components[component] ? components[component] : 'div',
			{
				title: name,
				className,
				style,
				children: !components[component] ? name : null,
			}
		);
	};
	return logo();
};
export default Brand;
