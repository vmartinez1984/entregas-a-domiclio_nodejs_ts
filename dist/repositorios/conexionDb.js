"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//require("dotenv").config({ path: "variables.env" });
const mongoose_1 = __importDefault(require("mongoose"));
const conectarDB = async () => {
    try {
        const url = "mongodb://root:123456@localhost:27017/EntregasADomicilio?authMechanism=DEFAULT";
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: "admin",
        };
        await mongoose_1.default.connect(url, options);
        console.log("base de datos conectada");
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = conectarDB;
