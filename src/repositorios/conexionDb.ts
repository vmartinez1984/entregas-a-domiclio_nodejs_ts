//require("dotenv").config({ path: "variables.env" });
import mongoose from "mongoose"

const conectarDB = async () => {
  try {
    const url =
      "mongodb://root:123456@localhost:27017/EntregasADomicilio?authMechanism=DEFAULT";
    const options: any = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: "admin",
    };

    await mongoose.connect(url, options);
    console.log("base de datos conectada");
  } catch (error) {
    console.log(error);
  }
};

export default conectarDB