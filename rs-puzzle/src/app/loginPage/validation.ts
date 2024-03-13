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

  // Validation for first name
  if (!firstNameField.validateEnglishAlphabet()) {
    errors.firstName.push('First name must contain only English alphabet letters.');
  }
  if (!firstNameField.validateFirstLetterUppercase(1)) {
    errors.firstName.push('First name must start with an uppercase letter.');
  }
  if (firstName.length < 3) {
    errors.firstName.push('First name should be 3 symbols or longer.');
  }

  // Validation for surname
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

// export default function validateForm(firstNameField: FormField, surnameField: FormField): string[] {
//   const firstName = firstNameField.getValue().trim();
//   const surname = surnameField.getValue().trim();

//   const errorMessages: string[] = [];

//   // Validation for first name
//   if (!firstNameField.validateEnglishAlphabet()) {
//     errorMessages.push('First name must contain only English alphabet letters.');
//   }
//   if (!firstNameField.validateFirstLetterUppercase(1)) {
//     errorMessages.push('First name must start with an uppercase letter.');
//   }
//   if (firstName.length < 3) {
//     errorMessages.push('First name should be 3 symbols or longer.');
//   }

//   // Validation for surname
//   if (!surnameField.validateEnglishAlphabet()) {
//     errorMessages.push('Surname must contain only English alphabet letters.');
//   }
//   if (!surnameField.validateFirstLetterUppercase(1)) {
//     errorMessages.push('Surname must start with an uppercase letter.');
//   }
//   if (surname.length < 4) {
//     errorMessages.push('Surname should be 4 symbols or longer.');
//   }

//   return errorMessages;
// }
