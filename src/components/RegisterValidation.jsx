function Validation(values) {
  let error = {};
  // regex for username / password validation
  const username_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values.username === "") {
    error.username = "Please enter username";
  } else if (!username_pattern.test(values.username)) {
    error.username = "username does not match";
  } else {
    error.username = "";
  }

  if (values.password === "") {
    error.password = "Please enter password";
  } else if (!password_pattern.test(values.password)) {
    error.password = "password does not match";
  } else {
    error.password = "";
  }

  return error;
}

export default Validation;
