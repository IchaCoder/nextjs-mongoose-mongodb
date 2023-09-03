import User from "@/models/User";
import connectMongo from "@/utils/connectdb";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";

const login = async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return res
         .status(400)
         .json({ message: "Please provide email and password" });
   }

   try {
      await connectMongo();
      const user = await User.findOne({ email });

      if (!user) {
         return res.status(401).json({ message: "Email not found" });
      }

      // compare password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
         return res.status(401).json({ message: "Invalid Password" });
      }

      const token = sign({ userId: user._id, name: user.name }, "jwt-secret", {
         expiresIn: "30d"
      });

      return res.status(200).json({ user: { name: user.name }, token });
   } catch (error) {
      return res.status(500).json({ error });
   }
};

export default login;
