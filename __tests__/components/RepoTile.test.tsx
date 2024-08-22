import '@testing-library/jest-dom';
import { act } from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import RepoTile from '../../src/components/RepoTile';
import { useAppSelector, useAppDispatch } from '@/lib/storeHooks';

jest.mock('../../src/lib/storeHooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

describe('Repo Tile', () => {
  const mockRepos = [
    { name: 'mock_name_1', description: 'mock_description_1', owner: 'mock_owner_1', url: 'mock_url_1', language: 'mock_language_1', stars: 123, id: 1 },
    { name: 'mock_name_2', description: 'mock_description_2', owner: 'mock_owner_2', url: 'mock_url_2', language: 'mock_language_2', stars: 456, id: 2 },
    { name: 'mock_name_3', description: 'mock_description_3', owner: 'mock_owner_3', url: 'mock_url_3', language: 'mock_language_3', stars: 789, id: 3 }
  ];

  beforeEach(() => {
    (useAppSelector as jest.Mock).mockReturnValue({
      favourites: mockRepos,
    });
  });


  it('adds to favourites', async () => {
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const props = { name: 'mock_name_4', description: 'mock_description_4', owner: 'mock_owner_4', url: 'mock_url_4', language: 'mock_language_4', stars: 0, id: 4 };
    render(<RepoTile {...props} />);

    await waitFor(() => {
      expect(screen.getByText(/mock_name_4/i)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('favourite'));
    });

    const addPayload = {"payload": {"description": "mock_description_4", "id": 4, "language": "mock_language_4", "name": "mock_name_4", "owner": "mock_owner_4", "stars": 0, "url": "mock_url_4"}, "type": "favourites/add"};
    expect(mockDispatch).toHaveBeenCalledWith(addPayload);
  })

  it('removes from favourites', async () => {
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const props = { name: 'mock_name_4', description: 'mock_description_4', owner: 'mock_owner_4', url: 'mock_url_4', language: 'mock_language_4', stars: 0, id: 1 };
    render(<RepoTile {...props} />);

    await waitFor(() => {
      expect(screen.getByText(/mock_name_4/i)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('favourite'));
    });

    const removePayload = {"payload": {"description": "mock_description_4", "id": 1, "language": "mock_language_4", "name": "mock_name_4", "owner": "mock_owner_4", "stars": 0, "url": "mock_url_4"}, "type": "favourites/remove"};
    expect(mockDispatch).toHaveBeenCalledWith(removePayload);
  })
})