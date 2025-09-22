// vitest.setup.ts
import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// i18n initialization
import './src/locales/i18n';

// Load polyfills
import './tests/vitest.polyfills';

afterEach(() => cleanup());
