import {
  EmailValidator,
  UsernameValidator,
  iSPasswordValid,
} from "@/validations/SignUpValidations";
export function UserNameHelper(InputName, handleErrorChange) {
  const UserValid = UsernameValidator(InputName);
  const res = setFormError(UserValid, "Username", handleErrorChange);
  return res;
}
export function EmailHelper(InputName, handleErrorChange) {
  const EmailValid = EmailValidator(InputName);
  const res = setFormError(EmailValid, "Email", handleErrorChange);
  return res;
}
export function PasswordHelper(Password, ConfirmPassword, handleErrorChange) {
  const PasswordValid = iSPasswordValid(Password, ConfirmPassword);

  const res = setFormError(PasswordValid, "Password", handleErrorChange);

  return res;
}

export function setFormError(ErrorDetails, ErrorTarget, handleErrorChange) {
 
  if (ErrorDetails !== true) {
    handleErrorChange(ErrorDetails, ErrorTarget);
    return false;
  } else {
    handleErrorChange("", ErrorTarget);
    return true;
  }
}
// ErrorDetails, ErrorTarget
