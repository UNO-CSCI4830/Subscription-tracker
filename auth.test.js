const { authUtils } = require('./authUtils.js');

describe('Auth Utility Unit Tests', () => {

  // Test 1: Email Validation
  test('isUnoEmail should return true for @uno.edu emails', () => {
    expect(authUtils.isUnoEmail('cadet@uno.edu')).toBe(true);
    expect(authUtils.isUnoEmail('user@gmail.com')).toBe(false);
  });

  // Test 2: Formatting
  test('prepareCredentials should trim and lowercase inputs', () => {
    const result = authUtils.prepareCredentials('  TEST@uno.edu  ', 'password123');
    expect(result.email).toBe('test@uno.edu');
    expect(result.password).toBe('password123');
  });

  // Test 3: Response Parsing (Simulating Supabase)
  test('parseAuthResponse should handle successful user data', () => {
    const mockData = { user: { id: '123' } };
    const result = authUtils.parseAuthResponse(mockData, null);
    expect(result.success).toBe(true);
    expect(result.message).toBe("Login successful");
  });

  test('parseAuthResponse should handle error objects', () => {
    const mockError = { message: "Invalid credentials" };
    const result = authUtils.parseAuthResponse(null, mockError);
    expect(result.success).toBe(false);
    expect(result.message).toBe("Invalid credentials");
  });

  // Test 4: Password Length
  test('isPasswordLongEnough should enforce 8-character limit', () => {
    expect(authUtils.isPasswordLongEnough('short')).toBe(false);
    expect(authUtils.isPasswordLongEnough('longenough123')).toBe(true);
  });
});