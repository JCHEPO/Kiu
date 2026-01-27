import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  nombre: String,
  apellido: String,
  fechaRegistro: { type: Date, default: Date.now },
  strikes: { type: Number, default: 0 },
  activo: { type: Boolean, default: true }
});

export default mongoose.model("User", UserSchema);
