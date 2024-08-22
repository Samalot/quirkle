import { POST } from '../../../../src/app/api/repo/route';

const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
global.fetch = mockFetch;

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((x) => x),
  },
}));

const mockRepos = {
  items: [
    { name: 'mock_name_1', description: 'mock_description_1', owner: { login: 'mock_owner_1' }, html_url: 'mock_url_1', language: 'mock_language_1', stargazers_count: 123, id: 1 },
    { name: 'mock_name_2', description: 'mock_description_2', owner: { login: 'mock_owner_2' }, html_url: 'mock_url_2', language: 'mock_language_2', stargazers_count: 456, id: 2 },
    { name: 'mock_name_3', description: 'mock_description_3', owner: { login: 'mock_owner_3' }, html_url: 'mock_url_3', language: 'mock_language_3', stargazers_count: 789, id: 3 }
  ]
};

const expectedRepos = [
  { name: 'mock_name_1', description: 'mock_description_1', owner: 'mock_owner_1', url: 'mock_url_1', language: 'mock_language_1', stars: 123, id: 1 },
  { name: 'mock_name_2', description: 'mock_description_2', owner: 'mock_owner_2', url: 'mock_url_2', language: 'mock_language_2', stars: 456, id: 2 },
  { name: 'mock_name_3', description: 'mock_description_3', owner: 'mock_owner_3', url: 'mock_url_3', language: 'mock_language_3', stars: 789, id: 3 }
];

describe('POST /api/repo', () => {
  it('should formatted repos on success', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockRepos,
    } as Response);

    const response = await POST(new Request('/api/repo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ language: 'All' }),
    }));

    expect(response).toStrictEqual(expectedRepos);
  });

  it('should error - rate limit', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 403,
      json: async () => ({ message: "limit exceeded" }),
    } as Response);

    const response = await POST(new Request('/api/repo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ language: 'All' }),
    }));

    expect(response).toStrictEqual({"message": "API limit exceeded, please retry shortly"});
  });

  it('should error - generic', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 500,
      json: async () => ({ message: "generic error message" }),
    } as Response);

    const response = await POST(new Request('/api/repo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ language: 'All' }),
    }));

    expect(response).toStrictEqual({"message": "generic error message"});
  });
});