import { Schema, model, models } from "mongoose";

const testSchema = new Schema({
   name: String,
   email: {
      type: String,
      required: true,
      unique: true,
   },
});

// Next js creates a new instance of model every now
// and then which creates an error so we first check
// if the model has already been created
const Test = models.Test || model("Test", testSchema);

export default Test;
