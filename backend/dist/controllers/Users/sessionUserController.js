"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/controllers/Users/sessionUserController.ts
var sessionUserController_exports = {};
__export(sessionUserController_exports, {
  sessionUserController: () => sessionUserController
});
module.exports = __toCommonJS(sessionUserController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/service/User/sessionUserService.ts
var import_bcryptjs = require("bcryptjs");
var import_jsonwebtoken = require("jsonwebtoken");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var sessionUserService = class {
  execute(acesso, senha) {
    return __async(this, null, function* () {
      if (!acesso || !senha) {
        throw new Error("Preenchar todos os campos");
      }
      const user = yield prisma_default.user.findFirst({
        where: { acesso }
      });
      if (!user) {
        throw new Error("usu\xE1rio n\xE3o existe");
      }
      const verificacaoDeSenha = yield (0, import_bcryptjs.compare)(senha, user.senha);
      if (!verificacaoDeSenha) {
        throw new Error("Senha incorreta");
      }
      const token = (0, import_jsonwebtoken.sign)(
        {
          nome: user.nome,
          email: user.email
        },
        process.env.JWT_SECRET,
        {
          subject: user.id,
          expiresIn: "15d"
        }
      );
      return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        token
      };
    });
  }
};

// src/controllers/Users/sessionUserController.ts
var sessionUserController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { acesso, senha } = req.body;
      const inicializacao = new sessionUserService();
      const login = yield inicializacao.execute(acesso, senha);
      return res.json(login);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sessionUserController
});
