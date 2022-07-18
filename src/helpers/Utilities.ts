export abstract class Utilities {
  static generateRandomCode(): string {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
  }
}
