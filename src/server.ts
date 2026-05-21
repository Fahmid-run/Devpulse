import app from "./app";
import configuration from "./config";
import initDB from "./db/db";

initDB();


app.listen(configuration.port,() => {
  console.log(`server is listening ${configuration.port}`);
})