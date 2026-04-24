// This file holds the logic for the unit tests
const authUtils = {
  // Method 1: Email Domain Validation
  isUnoEmail: (email) => {
    return email.toLowerCase().endsWith('@uno.edu');
  },

  // Method 2: Credential Formatting
  prepareCredentials: (email, password) => {
    return { 
      email: email.trim().toLowerCase(), 
      password: password 
    };
  },

  // Method 3: Supabase Response Parser
  parseAuthResponse: (data, error) => {
    if (error) return { success: false, message: error.message };
    if (data?.user) return { success: true, message: "Login successful" };
    return { success: false, message: "Unexpected error" };
  },

  // Method 4: Password Security Check
  isPasswordLongEnough: (password) => {
    return password.length >= 8;
  }
};

module.exports = { authUtils };