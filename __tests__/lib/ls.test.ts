import { saveFavourites, getFavourites } from '@/lib/ls';


describe('LocalStorage tests', () => {
  let originalWindow: typeof global.window;

  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };

  beforeEach(() => {
    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    originalWindow = global.window;
  });

  afterEach(() => {
    jest.clearAllMocks();
    global.window = originalWindow;
  });

  it('getFavourites() gives empty array on server', async () => {
    delete (global as any).window;
    const favourites = getFavourites();
    expect(favourites).toEqual([]);
  });

  it('getFavourites() gives empty if LS has no saved key', async () => {
    jest.spyOn(global.localStorage, 'getItem').mockImplementation(() => {
      return null; 
    });

    const favourites = getFavourites();
    expect(favourites).toEqual([]);
  });

  it('getFavourites() gives empty if LS has malformed json', async () => {
    jest.spyOn(global.localStorage, 'getItem').mockImplementation(() => {
      return ";-error:{}"; 
    });

    const favourites = getFavourites();
    expect(favourites).toEqual([]);
  });

  it('getFavourites() gives results if stored', async () => {
    jest.spyOn(global.localStorage, 'getItem').mockImplementation(() => {
      return JSON.stringify(["1", "2", "3"]); 
    });

    const favourites = getFavourites();
    expect(favourites).toEqual(["1", "2", "3"]);
  });

  it('saveFavourites() called', async () => {
    const repos =[
      { name: 'mock_name_1', description: 'mock_description_1', owner: 'mock_owner_1', url: 'mock_url_1', language: 'mock_language_1', stars: 123, id: 1 }
    ]
    saveFavourites(repos);
    expect(localStorageMock.setItem).toHaveBeenCalledWith("favourites", JSON.stringify(repos));
  });
})