import connectMongo from "@/utils/connectdb";
import login from "@/api/login";

export default async function (req, res) {
   const { method } = req;

   switch (method) {
      case "POST":
         login(req, res);
         break;

      default:
         res.status(404).send({ error: "Method not configured" });
         break;
   }
}
