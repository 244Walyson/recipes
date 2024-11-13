export class DuplicateresourceException extends Error {
  constructor(message: string) {
    super(message);
    this.name = DuplicateresourceException.name;
  }
}
