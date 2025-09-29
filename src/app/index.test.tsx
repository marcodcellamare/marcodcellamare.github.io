import { describe } from 'vitest';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/tests/vitest.utils';

import App from './index';

const menuTogglerClick = async () => {
	const menuToggle = screen.getByRole('button', { name: /menu/i });
	return await userEvent.click(menuToggle);
};

const navClick = async (text: string) => {
	const link = screen.getByRole('link', { name: new RegExp(text, 'i') });
	await waitFor(() => expect(link).toBeVisible());
	await userEvent.click(link);
};

const testPage = (link: string, heading: string) =>
	test(link, async () => {
		renderWithProviders(<App />);
		await menuTogglerClick();
		await navClick(link);

		expect(
			screen.getByRole('heading', {
				name: new RegExp(heading, 'i'),
			})
		).toBeInTheDocument();
	});

afterEach(cleanup);
describe('Check navigation', () => {
	testPage('About', 'Marco D. Cellamare');
	testPage('Projects', 'Design meets performance');
	testPage('Music', 'Beats, Rhymes & Electro Funk');
});
