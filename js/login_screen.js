// 1. Initialize Supabase
const _supabaseUrl = 'https://lnvmocbxmdfkaxrxmpqn.supabase.co';
const _supabaseKey = 'sb_publishable_gVZEpmVuhZBt-V8NSaibYw_zaQPsmOb';
const supabaseClient = supabase.createClient(_supabaseUrl, _supabaseKey);

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Stop the page from refreshing
  
  // 2. Get the input values
  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  // 3. Attempt to Sign In
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    alert("Login Failed: " + error.message);
  } else {
    console.log("Login successful! User session:", data.session);
    alert("Welcome back!");
    
    // 4. Send them to the dashboard
    window.location.href = "index.html"; 
  }
});