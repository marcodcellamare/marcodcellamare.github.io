import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import Providers from '@/app/components/Providers';

export const renderWithProviders = (ui: ReactNode, options = {}) =>
	render(<Providers>{ui}</Providers>, options);
