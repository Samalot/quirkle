import { RepoProps } from '@/components/RepoTile';
import { getFavourites } from '@/lib/ls';
import { favouriteSlice, add, remove } from '../../src/lib/features/favouriteSlice';

jest.mock('../../src/lib/ls', () => ({
  getFavourites: jest.fn(),
  saveFavourites: jest.fn(),
}));

describe('Favourite Slice', () => {
  const mockRepos: RepoProps[] = [
    { name: 'mock_name_1', description: 'mock_description_1', owner: 'mock_owner_1', url: 'mock_url_1', language: 'mock_language_1', stars: 123, id: 1 },
    { name: 'mock_name_2', description: 'mock_description_2', owner: 'mock_owner_2', url: 'mock_url_2', language: 'mock_language_2', stars: 456, id: 2 },
    { name: 'mock_name_3', description: 'mock_description_3', owner: 'mock_owner_3', url: 'mock_url_3', language: 'mock_language_3', stars: 789, id: 3 }
  ];

  const initialState = { favourites: mockRepos };

  it('loads repos from localStorage', async () => {
    const localStorageRepos: RepoProps[] = [
      { name: 'localStorage', description: 'mock_description_1', owner: 'mock_owner_1', url: 'mock_url_1', language: 'mock_language_1', stars: 123, id: 1 }
    ];

    (getFavourites as jest.Mock).mockReturnValue(localStorageRepos);
    const { favouriteSlice } = require('../../src/lib/features/favouriteSlice');

    const repo: RepoProps = { name: 'mock_name_4', description: 'mock_description_4', owner: 'mock_owner_4', url: 'mock_url_4', language: 'mock_language_4', stars: 123, id: 1 }
    const action = add(repo);
    const state = favouriteSlice.reducer(undefined, action);
    expect(state.favourites).toHaveLength(1);
  });


  it('adds to favourites if ID is not already stored', async () => {
    const repo: RepoProps = { name: 'mock_name_4', description: 'mock_description_4', owner: 'mock_owner_4', url: 'mock_url_4', language: 'mock_language_4', stars: 123, id: 4 }
    const action = add(repo);
    const state = favouriteSlice.reducer(initialState, action);
    expect(state.favourites).toHaveLength(4);
  });

  it('does not add to favourites if ID is already stored', async () => {
    const repo: RepoProps = { name: 'mock_name_4', description: 'mock_description_4', owner: 'mock_owner_4', url: 'mock_url_4', language: 'mock_language_4', stars: 123, id: 1 }
    const action = add(repo);
    const state = favouriteSlice.reducer(initialState, action);
    expect(state.favourites).toHaveLength(3);
  });

  it('removes from favourites if ID is already stored', async () => {
    const repo: RepoProps = { name: 'mock_name_4', description: 'mock_description_4', owner: 'mock_owner_4', url: 'mock_url_4', language: 'mock_language_4', stars: 123, id: 1 }
    const action = remove(repo);
    const state = favouriteSlice.reducer(initialState, action);
    expect(state.favourites).toHaveLength(2);
  });
})