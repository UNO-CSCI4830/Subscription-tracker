function validateEmail(email) {
  return email.includes("@") && email.includes(".");
}

function validatePassword(password) {
  return password.length >= 6;
}

function validateName(name) {
  return name.trim().length > 0;
}

function validatePrice(price) {
  return !isNaN(price) && Number(price) > 0;
}

function validateDate(date) {
  const today = new Date().toISOString().slice(0, 10);
  return date >= today;
}

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
  validatePrice,
  validateDate
};