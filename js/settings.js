// 1. Initialize with a unique variable name
const _supabaseUrl = 'https://lnvmocbxmdfkaxrxmpqn.supabase.co';
const _supabaseKey = 'sb_publishable_gVZEpmVuhZBt-V8NSaibYw_zaQPsmOb';

// Use 'supabaseClient' instead of just 'supabase' to avoid naming conflicts
const supabaseClient = supabase.createClient(_supabaseUrl, _supabaseKey);

const settingsForm = document.getElementById('settingsForm');

settingsForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log("Submit button clicked! Attempting to save preferences...");

  const reminderEmail = document.getElementById('reminderEmail').value;
  const reminderDays = document.getElementById('daysBefore').value;
  const reminderEnabled = document.getElementById('reminderEnabled').checked;

  try{
    const { data: userData } = await supabaseClient.auth.getUser();
    if (!userData.user) {
      alert("Please login first.");
      return;
    }
    const user = userData.user;
    const { data, error } = await supabaseClient
      .from('reminder_preferences')
      .upsert([
        {
          user_id: user.id,
          email: reminderEmail,
          reminder_days: Number(reminderDays),
          notification_enabled: reminderEnabled
        }
      ], {onConflict: 'user_id'});

    if (error) {
      console.error("Supabase Error:", error.message);
      alert("Error: " + error.message);
    } else {
      console.log("Saved:", data);
      alert("Saved!");
    }
  } catch (err) {
    console.error("Unexpected Error:", err);
    alert("Something went wrong. Check the console.");
  }
});

////////////
document.addEventListener("DOMContentLoaded", () => {
  const testEmailBtn = document.getElementById("testEmailBtn");

  testEmailBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Triggered!");
    fetch("https://lnvmocbxmdfkaxrxmpqn.supabase.co/functions/v1/reminder-emails")
      .catch(() => {});
  });
});