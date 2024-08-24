import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, minLength: 6 },
  password: { type: String, required: true },
});

// eslint-disable-next-line no-undef
export default User = model('User', UserSchema);
