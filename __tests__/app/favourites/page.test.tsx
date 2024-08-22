import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Page from '../../../src/app/favourites/page';
import { useAppSelector } from '@/lib/storeHooks';
import { RepoProps } from '@/components/RepoTile';

jest.mock('../../../src/lib/storeHooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));


describe('Favourites Page', () => {
  const mockRepos: RepoProps[] = [
    { name: 'mock_name_1', description: 'mock_description_1', owner: 'mock_owner_1', url: 'mock_url_1', language: 'mock_language_1', stars: 123, id: 1 },
    { name: 'mock_name_2', description: 'mock_description_2', owner: 'mock_owner_2', url: 'mock_url_2', language: 'mock_language_2', stars: 456, id: 2 },
    { name: 'mock_name_3', description: 'mock_description_3', owner: 'mock_owner_3', url: 'mock_url_3', language: 'mock_language_3', stars: 789, id: 3 }
  ];

  it('renders', async () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      favourites: mockRepos,
    });
    render(<Page />);
    

    await waitFor(() => {
      expect(screen.getByText(/mock_name_1/i)).toBeInTheDocument();
    });

    const tileContainer = screen.getByTestId('tile-container');
    expect(tileContainer.children.length).toBe(3);
  })

  it('renders message on no saved', async () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      favourites: [],
    });
    render(<Page />);

    await waitFor(() => {
      expect(screen.getByText(/You have not saved any repos/i)).toBeInTheDocument();
    });
  })
})