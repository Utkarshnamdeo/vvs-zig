/**
 * @jest-environment jsdom
 */

import { render , screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import App from './App';

describe('App test', () => {
  it('should have the correct heading', () => {
    render(<App />);
    const [pageHeading] = screen.getAllByRole('heading')
    expect(pageHeading).toHaveTextContent('Umweltrechner');
  });
})