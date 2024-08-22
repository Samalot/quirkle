import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { act } from 'react';
import Page from '../../src/app/page';
import { useAppSelector } from '@/lib/storeHooks';

const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
global.fetch = mockFetch;

jest.mock('../../src/lib/storeHooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockRepos = [
  { name: 'mock_name_1', description: 'mock_description_1', owner: 'mock_owner_1', url: 'mock_url_1', language: 'mock_language_1', stars: 123 },
  { name: 'mock_name_2', description: 'mock_description_2', owner: 'mock_owner_2', url: 'mock_url_2', language: 'mock_language_2', stars: 456 },
  { name: 'mock_name_3', description: 'mock_description_3', owner: 'mock_owner_3', url: 'mock_url_3', language: 'mock_language_3', stars: 789 }
];

describe('Trending Page', () => {
  beforeEach(() => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockRepos,
    } as Response);

    (useAppSelector as jest.Mock).mockReturnValue({
      favourites: [],
    });
  });

  afterEach(() => {
    mockFetch.mockClear();
  });

  it('calls the API and displays the tiles', async () => {
    render(<Page />);
    expect(fetch).toHaveBeenCalledWith('/api/repo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({language: 'All'})
    });

    // Tiles render
    await waitFor(() => {
      expect(screen.getByText(/mock_name_1/i)).toBeInTheDocument();
    });

    const tileContainer = screen.getByTestId('tile-container');
    expect(tileContainer.children.length).toBe(3);
  });

  it('displays error message on API fail', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      json: async () => ({ message: 'mock_error' }),
    } as Response);

    render(<Page />);

    // Error component renders
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    // Click the retry button, normal tiles are rendered  
    await act(async () => {
      fireEvent.click(screen.getByTestId('retry'));
    })

    await waitFor(() => {
      expect(screen.getByText(/mock_name_1/i)).toBeInTheDocument();
    });
  });

  it('calls the API with a different language filter', async () => {
    render(<Page />);
    
    await waitFor(() => {
      expect(screen.getByText(/mock_name_1/i)).toBeInTheDocument();
    });

    // Select language 'python'
    await act(async () => {
      fireEvent.change(screen.getByTestId('language-select'), { target: { value: 'python' } });
    })
    
    expect(fetch).toHaveBeenCalledWith('/api/repo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({language: 'python'})
    });
  });

})