export interface IPasswordHashDTO {
  hashPassword(password: string): Promise<string>;
  comparePasswordHash(
    enteredPassword: string,
    currentUserPassword: string
  ): Promise<boolean>;
}
