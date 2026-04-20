
// 1. Initialize with a unique variable name
const _supabaseUrl = 'https://lnvmocbxmdfkaxrxmpqn.supabase.co';
const _supabaseKey = 'sb_publishable_gVZEpmVuhZBt-V8NSaibYw_zaQPsmOb';

// Use 'supabaseClient' instead of just 'supabase' to avoid naming conflicts
const supabaseClient = supabase.createClient(_supabaseUrl, _supabaseKey);

const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log("Submit button clicked! Attempting to sign up...");

  // 2. Grab the values
  const email = signupForm.querySelector('input[type="email"]').value;
  const password = signupForm.querySelector('input[type="password"]').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;

  try {
    // 3. Call the Supabase Auth function using our new variable name
    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      }
    });

    if (error) {
      console.error("Supabase Error:", error.message);
      alert("Error: " + error.message);
    } else {
      console.log("Success! User data:", data);
      alert("Success! Check your email for a confirmation link.");
    }
  } catch (err) {
    console.error("Unexpected Error:", err);
    alert("Something went wrong. Check the console.");
  }
});