import User from "@/models/User";
import connectMongo from "@/utils/connectdb";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
const signup = async (req, res) => {
   const { name, email, password } = req.body;

   if (!password) {
      return res.status(400).json({ error: "Password not provided" });
   } else if (password.length < 6) {
      return res
         .status(400)
         .json({ error: "Password should be at least 6 characters" });
   }
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   let tempUser = { name, email };

   tempUser.password = hashedPassword;

   try {
      await connectMongo();
      //  console.log("CONNECTED TO MONGO");

      const user = await User.create(tempUser);
      //  console.log("CREATED DOCUMENT");
      const token = sign({ userId: user._id, name: user.name }, "jwt-secret", {
         expiresIn: "30d"
      });
      return res.status(200).json({ user: { name: test.name }, token });
   } catch (error) {
      console.log(error);
      if (error.name === "ValidationError") {
         return res.status(400).json({
            error: error.message.replace("User validation failed: ", "")
         });
      } else if (error.code === 11000) {
         // Check for unique constraint error
         return res.status(400).json({ error: "Email already exists" });
      }
      return res.status(500).json({ error: "Error creating user" });
   }
};

export default signup;
