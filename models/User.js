import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
   name: {
      type: String,
      required: [true, "Name is required"]
   },
   email: {
      type: String,
      required: [true, "please provide email"],
      unique: [true, "This Email already exists"],
      match: [
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         "Please provide a valid email"
      ]
   },
   password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: [6, "Password should be at least 6 characters"]
   }
});

// Next js creates a new instance of model every now
// and then which creates an error so we first check
// if the model has already been created
// Test here is the name of the model
const User = models.Test || model("Test", UserSchema);

export default User;
