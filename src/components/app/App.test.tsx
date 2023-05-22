import { render, screen } from '@testing-library/react';
import AppWrapper from './App';

test('renders learn react link', () => {
  render(<AppWrapper />);
  const linkElement = screen.queryByText(/learn react/i);
  expect(linkElement).toBeNull();
});
