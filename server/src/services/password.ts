import * as bcrypt from 'bcryptjs';
import { Instance } from 'sequelize';
import { User } from '../types/models';

export async function hashPassword(user: Instance<User>) {
  if (!user.changed('password')) {
    return;
  }

  const newPassword = await bcrypt.hash(user.get('password'), 10);

  user.set('password', newPassword);
}
