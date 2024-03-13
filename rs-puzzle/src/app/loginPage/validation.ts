import FormField from './formField';

export interface ValidationErrors {
  [key: string]: string[];
  firstName: string[];
  surname: string[];
}

export function validateForm(firstNameField: FormField, surnameField: FormField): ValidationErrors {
  const firstName = firstNameField.getValue().trim();
  const surname = surnameField.getValue().trim();

  const errors: ValidationErrors = {
    firstName: [],
    surname: [],
  };

  if (!firstNameField.validateEnglishAlphabet()) {
    errors.firstName.push('First name must contain only English alphabet letters.');
  }
  if (!firstNameField.validateFirstLetterUppercase(1)) {
    errors.firstName.push('First name must start with an uppercase letter.');
  }
  if (firstName.length < 3) {
    errors.firstName.push('First name should be 3 symbols or longer.');
  }

  if (!surnameField.validateEnglishAlphabet()) {
    errors.surname.push('Surname must contain only English alphabet letters.');
  }
  if (!surnameField.validateFirstLetterUppercase(1)) {
    errors.surname.push('Surname must start with an uppercase letter.');
  }
  if (surname.length < 4) {
    errors.surname.push('Surname should be 4 symbols or longer.');
  }

  return errors;
}
