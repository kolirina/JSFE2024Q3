import FormField from './formField';

export interface ValidationErrors {
  [key: string]: string[];
  login: string[];
  password: string[];
}

export function validateForm(loginField: FormField, passwordField: FormField): ValidationErrors {
  const login = loginField.getValue().trim();
  const password = passwordField.getValue().trim();

  const errors: ValidationErrors = {
    login: [],
    password: [],
  };

  if (!loginField.validateEnglishAlphabet()) {
    errors.login.push('Name must contain only English alphabet letters');
  }
  if (login.length < 3) {
    errors.login.push('Name should be 3 symbols or longer');
  }

  if (!passwordField.validateEnglishAlphabet()) {
    errors.password.push('password must contain only English alphabet letters');
  }
  if (!passwordField.validateAnyLetterUppercase()) {
    errors.password.push('password must contain at least one capital letter');
  }
  if (password.length < 4) {
    errors.password.push('password should be 4 symbols or longer');
  }

  return errors;
}
