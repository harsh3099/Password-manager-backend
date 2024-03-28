import { App } from './app';
import { render, screen } from '@testing-library/react';
import React from 'react';

test('renders heading', async () => {
  render(<App />);
  const heading = screen.getByText('React Boilerplate');
  expect(heading).toBeInTheDocument();
});
