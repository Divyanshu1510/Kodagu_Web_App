import { Schema, model } from 'mongoose';
import { hash } from 'bcrypt';

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  const user = this;
  const saltRounds = 10;

  if (user.isModified('password')) {
    user.password = await hash(user.password, saltRounds);
  }

  next();
});

const User = model('User', userSchema);

export default User;
