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

// src/controllers/Users/AtualizandoUserController.ts
var AtualizandoUserController_exports = {};
__export(AtualizandoUserController_exports, {
  AtualizandoUserController: () => AtualizandoUserController
});
module.exports = __toCommonJS(AtualizandoUserController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/service/User/AtulizandoUserSerive.ts
var import_bcryptjs = require("bcryptjs");
var AtualizandoUserService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ user_id, foto, nome, acesso, senha }) {
      const existe = yield prisma_default.user.findFirst({
        where: { id: user_id }
      });
      if (!existe) {
        throw new Error("Usu\xE1rio n\xE3o existe");
      }
      const atualizado = yield prisma_default.user.update({
        where: { id: user_id },
        data: {
          foto: foto ? foto : void 0,
          nome,
          acesso,
          senha: senha && (yield (0, import_bcryptjs.hash)(senha, 10))
        }
      });
      return atualizado;
    });
  }
};

// src/controllers/Users/AtualizandoUserController.ts
var AtualizandoUserController = class {
  atulizando(req, res) {
    return __async(this, null, function* () {
      const inicializando = new AtualizandoUserService();
      const { nome, acesso, senha } = req.body;
      const user_id = req.user_id;
      const { originalname, filename: foto } = req.file || {};
      const atualizado = yield inicializando.execute({
        user_id,
        foto: foto || "",
        nome,
        acesso,
        senha
      });
      return res.json(atualizado);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AtualizandoUserController
});
