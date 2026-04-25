//Tests for guest functions and fetchSubs

const GUEST_STORAGE_KEY = "subtracked_guest_subscriptions";

// Mirrors fetchSubs but accepts deps instead of closing over globals
async function fetchSubsUnderTest(supabaseClient, currentUser) {
  const { data, error } = await supabaseClient
    .from('subscriptions')
    .select('*')
    .eq('user_id', currentUser.id)
    .order('renewal', { ascending: true });

  if (error) { console.error(error); return { subs: null, error }; }
  return { subs: data, error: null };
}

function loadGuestSubsUnderTest(storage) {
  try {
    return JSON.parse(storage.getItem(GUEST_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveGuestSubsUnderTest(subs, storage) {
  storage.setItem(GUEST_STORAGE_KEY, JSON.stringify(subs));
}

function makeGuestId() {
  return Date.now().toString() + Math.random().toString(16).slice(2);
}

// Test helper functions

function makeSupabaseClient(resolvedValue) {
  const chain = {
    select: jest.fn().mockReturnThis(),
    eq:     jest.fn().mockReturnThis(),
    order:  jest.fn().mockResolvedValue(resolvedValue),
  };
  return { from: jest.fn().mockReturnValue(chain), chain };
}

function makeStorage(initial = {}) {
  const store = { ...initial };
  return {
    getItem: jest.fn((k) => store[k] ?? null),
    setItem: jest.fn((k, v) => { store[k] = v; }),
  };
}

// Test for fetching subscription info

describe('fetchSubs', () => {
  const mockUser = { id: 'user-123' };

  test('returns data on success', async () => {
    const mockData = [{ id: '1', name: 'Netflix', renewal: '2025-06-01' }];
    const { client } = (() => {
      const c = makeSupabaseClient({ data: mockData, error: null });
      return { client: c };
    })();

    const { subs, error } = await fetchSubsUnderTest(client, mockUser);
    expect(error).toBeNull();
    expect(subs).toEqual(mockData);
  });

  test('queries the right table and user', async () => {
    const client = makeSupabaseClient({ data: [], error: null });

    await fetchSubsUnderTest(client, mockUser);

    expect(client.from).toHaveBeenCalledWith('subscriptions');
    expect(client.chain.eq).toHaveBeenCalledWith('user_id', 'user-123');
    expect(client.chain.order).toHaveBeenCalledWith('renewal', { ascending: true });
  });

  test('returns error and null subs on failure', async () => {
    const client = makeSupabaseClient({ data: null, error: { message: 'DB error' } });

    const { subs, error } = await fetchSubsUnderTest(client, mockUser);
    expect(subs).toBeNull();
    expect(error).toEqual({ message: 'DB error' });
  });

  test('handles empty result set', async () => {
    const client = makeSupabaseClient({ data: [], error: null });

    const { subs } = await fetchSubsUnderTest(client, mockUser);
    expect(subs).toEqual([]);
  });
});

// Tests for loading guest subscription info

describe('loadGuestSubs', () => {
  test('parses and returns stored subscriptions', () => {
    const stored = [{ id: '1', name: 'Spotify' }];
    const storage = makeStorage({ [GUEST_STORAGE_KEY]: JSON.stringify(stored) });

    expect(loadGuestSubsUnderTest(storage)).toEqual(stored);
  });

  test('returns empty array when key does not exist', () => {
    const storage = makeStorage();
    expect(loadGuestSubsUnderTest(storage)).toEqual([]);
  });

  test('returns empty array on empty string value', () => {
    const storage = makeStorage({ [GUEST_STORAGE_KEY]: '' });
    expect(loadGuestSubsUnderTest(storage)).toEqual([]);
  });
});

// Tests for saving guest subscription info

describe('saveGuestSubs', () => {
  test('writes serialised array to storage', () => {
    const storage = makeStorage();
    const subs = [{ id: '1', name: 'Netflix' }];

    saveGuestSubsUnderTest(subs, storage);
    expect(storage.setItem).toHaveBeenCalledWith(
      GUEST_STORAGE_KEY,
      JSON.stringify(subs)
    );
  });

  test('correctly writes an empty array', () => {
    const storage = makeStorage();
    saveGuestSubsUnderTest([], storage);
    expect(storage.setItem).toHaveBeenCalledWith(GUEST_STORAGE_KEY, '[]');
  });

  test('round-trips correctly with loadGuestSubs', () => {
    // Save then load should produce the same data
    const store = {};
    const storage = {
      getItem: (k) => store[k] ?? null,
      setItem: (k, v) => { store[k] = v; },
    };
    const subs = [{ id: '1', name: 'Hulu', price: 12 }];

    saveGuestSubsUnderTest(subs, storage);
    expect(loadGuestSubsUnderTest(storage)).toEqual(subs);
  });
});

// Tests for guest ID creation

describe('makeGuestId', () => {
  test('returns a non-empty string', () => {
    expect(typeof makeGuestId()).toBe('string');
    expect(makeGuestId().length).toBeGreaterThan(0);
  });

  test('generates unique IDs across many calls', () => {
    const ids = new Set(Array.from({ length: 100 }, makeGuestId));
    expect(ids.size).toBe(100);
  });

  test('ID begins with current timestamp', () => {
    jest.spyOn(Date, 'now').mockReturnValue(1700000000000);
    expect(makeGuestId().startsWith('1700000000000')).toBe(true);
    jest.restoreAllMocks();
  });

  test('ID contains only alphanumeric characters', () => {
    expect(makeGuestId()).toMatch(/^[a-f0-9]+$/);
  });
});