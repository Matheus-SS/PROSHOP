import { IPasswordHashDTO } from '../PasswordHashDTO';

class mockHashProvider implements IPasswordHashDTO {
  public async hashPassword(enteredPassword: string): Promise<string> {
    const hashedPassword = enteredPassword;
    return hashedPassword;
  }

  public async comparePasswordHash(
    enteredPassword: string,
    currentUserPassword: string
  ): Promise<boolean> {
    return enteredPassword === currentUserPassword;
  }
}

export default mockHashProvider;
