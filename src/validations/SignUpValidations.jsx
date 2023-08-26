export function EmailValidator(email) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.match(validRegex)) {
    return true;
  } else {
    return "Invalid email address";
  }
}

export function UsernameValidator(Username) {
  // is length Greater than or equal to 8
  console.log(Username)
  if (!Username | Username.length <= 8) return "Invalid username";

  //if starting is number of characters
  var startingLettter = /^[a-z]/;
  if (!Username.match(startingLettter))
    return "Username must start with a letter";
    var Charector = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-\/|=]/;
    if(Username.match(Charector)) return "Username must not contain any other special characters other than '_'";
  //validate Using RegExp
  var validRegex = /^[a-z][a-z0-9_]{8,16}$/;

  //if not match regex then return false
  if (Username.match(validRegex)) {
    return true;
  } else {
    return "Invalid username";
  }
}

export function iSPasswordValid(password, confirmPassword) {
  if (password.length <= 8) return "Please Provide Atleast 8 characters";
  var PasswordRegix =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%,*#?&])[A-Za-z\d@$!%*#?,&]{8,}$/;
  var CheckForNumberRegix = /\d/;
  if (password.match(PasswordRegix)) return true;
  var CheckForCharRegix = /[@$!%,*#?&]/;
  if (!password.match(CheckForNumberRegix))
    return "Please Include atleast a number in your password";
  if (!password.match(CheckForCharRegix))
    return "Please Include atleast a Speacial Charector in your password";
  if (!password.match(PasswordRegix)) return "Week Password";
  if (password !== confirmPassword) {
    return "Passwords must match";
  }
}
