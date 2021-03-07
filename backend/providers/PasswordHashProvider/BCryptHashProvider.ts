import bcrypt from 'bcryptjs';
import { IPasswordHashDTO } from './PasswordHashDTO';

class BCryptHashProvider implements IPasswordHashDTO {
  public async hashPassword(enteredPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(enteredPassword, salt);
    return hashedPassword;
  }

  public async comparePasswordHash(
    enteredPassword: string,
    currentUserPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, currentUserPassword);
  }
}

export default BCryptHashProvider;
