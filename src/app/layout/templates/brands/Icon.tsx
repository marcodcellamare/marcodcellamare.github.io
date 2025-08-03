import Adecco from '@/assets/brands/adecco.svg?react';
import AeroportiDiPuglia from '@/assets/brands/aeroporti-di-puglia.svg?react';
import ANAS from '@/assets/brands/anas.svg?react';
import BancaPopolareDiBari from '@/assets/brands/banca-popolare-di-bari.svg?react';
import BAT from '@/assets/brands/bat.svg?react';
import ComuneDiBari from '@/assets/brands/comune-di-bari.svg?react';
import DanskRetursystem from '@/assets/brands/dansk-retursystem.svg?react';
import DiLeo from '@/assets/brands/dileo.svg?react';
import Framesi from '@/assets/brands/framesi.svg?react';
import GasNatural from '@/assets/brands/gas-natural.svg?react';
import LakridsByBulow from '@/assets/brands/lakrids-by-bulow.svg?react';
import Legambiente from '@/assets/brands/legambiente.svg?react';
import Lotto from '@/assets/brands/lotto.svg?react';
import Mongolfiera from '@/assets/brands/mongolfiera.svg?react';
import Natuzzi from '@/assets/brands/natuzzi.svg?react';
import NewYorkYankees from '@/assets/brands/new-york-yankees.svg?react';
import RegionePuglia from '@/assets/brands/regione-puglia.svg?react';
import Volvo from '@/assets/brands/volvo.svg?react';

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

interface IconProps {
	name: keyof typeof icons;
	className?: string;
}

const icons: Record<string, IconComponent> = {
	adecco: Adecco,
	'aeroporti-di-puglia': AeroportiDiPuglia,
	anas: ANAS,
	'banca-popolare-di-bari': BancaPopolareDiBari,
	bat: BAT,
	'comune-di-bari': ComuneDiBari,
	'dansk-retursistem': DanskRetursystem,
	'di-leo': DiLeo,
	framesi: Framesi,
	'gas-natural': GasNatural,
	'lakrids-by-bulow': LakridsByBulow,
	legambiente: Legambiente,
	lotto: Lotto,
	mongolfiera: Mongolfiera,
	natuzzi: Natuzzi,
	'new-york-yankees': NewYorkYankees,
	'regione-puglia': RegionePuglia,
	voldo: Volvo,
};
const Icon = ({ name, className }: IconProps) => {
	const SvgIcon = icons[name];

	if (!SvgIcon) {
		console.warn(`Icon "${name}" not found`);
		return null;
	}
	return <SvgIcon className={className} />;
};

export default Icon;
