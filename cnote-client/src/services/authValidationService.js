const MIN_USERNAME_LENGTH = 4;
const MAX_USERNAME_LENGTH = 50;
const MAX_EMAIL_LENGTH = 100;
const MIN_PASS_LENGTH = 8;
const MAX_PASS_LENGTH = 30;

// Client-side validation functions
export const validateSignupForm = (formData) => {
  const { username, email, password } = formData;
  let isValid = isValidUsername(username) && isValidEmail(email) && isValidPassword(password);
  return isValid;
};

const isValidUsername = (username) => {
  const isValidUsername =
    username != null &&
    username.trim() !== "" &&
    !username.includes(" ") &&
    username.length >= MIN_USERNAME_LENGTH &&
    username.length <= MAX_USERNAME_LENGTH;

  return isValidUsername;
};

const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isValidEmail =
    email != null &&
    email.trim() !== "" &&
    emailPattern.test(email) &&
    email.length <= MAX_EMAIL_LENGTH;

  return isValidEmail;
};

const isValidPassword = (password) => {
  const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const isValidPass =
    password != null &&
    password.trim() !== "" &&
    password.length >= MIN_PASS_LENGTH &&
    password.length <= MAX_PASS_LENGTH &&
    /[A-Z]/.test(password) && // Has uppercase
    /[a-z]/.test(password) && // Has lowercase
    /\d/.test(password) && // Has digit
    [...specialChars].some(char => password.includes(char)); // Has special char

  return isValidPass;
};