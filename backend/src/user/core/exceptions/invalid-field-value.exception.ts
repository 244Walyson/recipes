export class UserInvalidFieldValueException extends Error {
  constructor(fieldName: string, message: string) {
    super(`Invalid value for field ${fieldName}: ${message}`);
    this.name = UserInvalidFieldValueException.name;
  }
}
