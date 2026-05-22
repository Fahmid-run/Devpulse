import { config } from "dotenv";
import path from "node:path";

config({
  path:path.join(process.cwd(), ".env")

})

const configuration = {
  port: process.env.PORT,
  connectionStr: process.env.CONNECTION_STRING as string,
  JWT_SECRET: process.env.JWT_SECRET,
};


export default configuration;