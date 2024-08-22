import { render, screen } from '@testing-library/react';
import Layout, { metadata } from '../../src/app/layout';
import '@testing-library/jest-dom';

 
describe('Main Layout', () => {
  it('renders child content', () => {
    render(<Layout><div>Child</div></Layout>);
    const layout = screen.getByTestId('layout');
    expect(layout).toBeInTheDocument();
  });

  it('creates metadata', () => {
    expect(metadata.title).toBe('GitTrend');
    expect(metadata.description).toBe('Popular new GitHub repos');
  });
})