import { render, screen } from '@testing-library/react';
import App from './App';

window.URL.createObjectURL = function() {};
test('renders items link', () => {
  render(<App />);
  const linkElement = screen.getByText(/items/i);
  expect(linkElement).toBeInTheDocument();
});