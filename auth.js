const USERS_STORAGE_KEY = "users";
const CURRENT_USER_STORAGE_KEY = "currentUser";

function loadUsers(){
    const saveUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (!saveUsers){
        return [];
    }
    return JSON.parse(saveUsers);
}

function saveUsers(users){
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function loadCurrentUser(){
    const currentUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    if (!currentUser){
        return null;
    }
    return JSON.parse(currentUser);
}

function saveCurrentUser(user){
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
}

function logoutCurrentUser(){
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
}

function findUserByEmail(email){
    const users = loadUsers();
    for (let i = 0; i < users.length; i++){
        if (users[i].email.toLowerCase() === email.toLowerCase()){
            return users[i];
        }
    }
    return null;
}

///////////////////////// Create account //////////////////////////
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function(e){
        e.preventDefault()
        const firstName = document.getElementById("firstName").value.trim();
        const lastName =  document.getElementById("lastName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;
        
        const termsChecked = document.getElementById("terms").checked;
        const signupMessage = document.getElementById("signupMessage");
        
        signupMessage.textContent = "";

        if (!firstName || !lastName || !email || !password) {
            signupMessage.textContent = "Please fill in all fields."
            return;
        }
        if (!termsChecked){
            signupMessage.textContent = "Please accept the terms.";
            return;
        }

        const existingUser = findUserByEmail(email);
        if (existingUser) {
            signupMessage.textContent = "This email is already registered.";
            return;
        }

        const users = loadUsers();
        const newUser = {
            id: Date.now(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        users.push(newUser);
        saveUsers(users);

        signupMessage.textContent = "Account created successfully.";

        setTimeout(function (){
            window.location.href = "login_screen.html";
        }, 1000);

    });
}
/////////////// Login //////////////////////////////
const loginForm = document.getElementById("loginForm");

if (loginForm){
    loginForm.addEventListener("submit",function(e){
        e.preventDefault();
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        const loginMessage = document.getElementById("loginMessage");

        loginMessage.textContent = "";
        const foundUser = findUserByEmail(email);

        if (!foundUser) {
            loginMessage.textContent = "No account registered by this email.";
            return;
        }
        if (foundUser.password !== password){
            loginMessage.textContent = "Invalid password.";
            return;
        }

        saveCurrentUser({
            id: foundUser.id,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            email: foundUser.email
        });

        loginMessage.textContent = "Login successful.";
        setTimeout(function (){
            window.location.href = "project (1).html";
        }, 1000);

    });
}

//////////////// Main Page ////////////////////
const currentUserText = document.getElementById("currentUserText");
const logoutBtn = document.getElementById("logoutBtn");
const loginBtn = document.getElementById("loginBtn")

if (currentUserText || logoutBtn || loginBtn) {
  const currentUser = loadCurrentUser();

  if (currentUser){
    if (currentUserText){currentUserText.textContent = "Logged in as " + currentUser.email;}

    if (logoutBtn){
        logoutBtn.style.display = "inline-block";
        logoutBtn.addEventListener("click", function(){logoutCurrentUser(); window.location.reload();});
    }

    if (loginBtn){
        loginBtn.style.display = "none";
    } 

    } else{
        if (currentUserText){
            currentUserText.textContent = "Guest mode";
        }
        if (logoutBtn){
            logoutBtn.style.display = "none";
        }
        if (loginBtn){
            loginBtn.style.display = "inline-block";
            loginBtn.addEventListener("click", function(){window.location.href = "login_screen.html";});
        }
    }
}