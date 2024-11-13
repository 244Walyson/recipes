export class ResourceNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = ResourceNotFoundException.name;
  }
}
