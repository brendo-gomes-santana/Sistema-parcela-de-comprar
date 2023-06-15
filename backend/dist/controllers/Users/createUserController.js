"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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

// src/controllers/Users/createUserController.ts
var createUserController_exports = {};
__export(createUserController_exports, {
  createUserController: () => createUserController
});
module.exports = __toCommonJS(createUserController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/service/User/createUserService.ts
var import_bcryptjs = require("bcryptjs");
var createUserService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      foto,
      nome,
      data_de_nascimento,
      email,
      acesso,
      senha
    }) {
      if (!foto || !nome || !data_de_nascimento || !email || !acesso || !senha) {
        throw new Error("Preenchar todas as informa\xE7\xF5es");
      }
      const user = yield prisma_default.user.findFirst({
        where: { email }
      });
      if (user) {
        throw new Error("usu\xE1rio j\xE1 existe");
      }
      const create = yield prisma_default.user.create({
        data: {
          foto,
          nome,
          data_de_nascimento,
          email,
          acesso,
          senha: yield (0, import_bcryptjs.hash)(senha, 10)
        },
        select: {
          id: true,
          nome: true
        }
      });
      return create;
    });
  }
};

// src/controllers/Users/createUserController.ts
var createUserController = class {
  create(req, res) {
    return __async(this, null, function* () {
      const inicializacao = new createUserService();
      if (!req.file) {
        throw new Error("error no uploado de file");
      } else {
        const { originalname, filename: foto } = req.file;
        const { nome, email, acesso, senha, data_de_nascimento } = req.body;
        const user = yield inicializacao.execute({
          foto,
          nome,
          email,
          acesso,
          senha,
          data_de_nascimento
        });
        return res.json(user);
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUserController
});
