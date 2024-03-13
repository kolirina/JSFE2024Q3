export function storeUserData(firstName: string, surname: string): void {
  const userData = { firstName, surname };
  localStorage.setItem('userData', JSON.stringify(userData));
}

export function retrieveUserData(): { firstName: string; surname: string } | null {
  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
    return JSON.parse(userDataString);
  }
  return null;
}
