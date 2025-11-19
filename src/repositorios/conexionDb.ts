const mongoose = require("mongoose");
//require("dotenv").config({ path: "variables.env" });

const conectarDB = async () => {
  try {
    const url =
      "mongodb://root:123456@localhost:27017/EntregasADomicilio?authMechanism=DEFAULT";
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: "admin", // Si se requiere una base de datos de autenticación específica
    });
    console.log("base de datos conectada");
  } catch (error) {
    console.log(error);
  }
};

module.exports = conectarDB 