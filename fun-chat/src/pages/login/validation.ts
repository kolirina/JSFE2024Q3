import FormField from './formField';

export interface ValidationErrors {
  [key: string]: string[];
  name: string[];
  password: string[];
}

export function validateForm(nameField: FormField, passwordField: FormField): ValidationErrors {
  const name = nameField.getValue().trim();
  const password = passwordField.getValue().trim();

  const errors: ValidationErrors = {
    name: [],
    password: [],
  };

  if (!nameField.validateEnglishAlphabet()) {
    errors.name.push('Name must contain only English alphabet letters');
  }
  if (name.length < 3) {
    errors.name.push('Name should be 3 symbols or longer');
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
