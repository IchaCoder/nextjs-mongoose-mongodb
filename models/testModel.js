import { Schema, model, models } from "mongoose";

const testSchema = new Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: [true, "please provide email"],
      unique: true,
      match: [
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         "Please provide a valid email",
      ],
   },
   password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
   },
});

// Next js creates a new instance of model every now
// and then which creates an error so we first check
// if the model has already been created
const Test = models.Test || model("Test", testSchema);

export default Test;
