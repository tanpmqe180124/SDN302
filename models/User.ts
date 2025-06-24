import mongoose, { Schema, models } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Only for credentials provider
  image: { type: String },
}, { timestamps: true });

const User = models.User || mongoose.model('User', UserSchema);

export default User;
