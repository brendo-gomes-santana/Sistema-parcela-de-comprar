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

// src/controllers/Compras/CreateComprarController.ts
var CreateComprarController_exports = {};
__export(CreateComprarController_exports, {
  CreateComprarController: () => CreateComprarController
});
module.exports = __toCommonJS(CreateComprarController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/service/Compras/CreateComprarService.ts
var CreateComprarService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      titulo,
      descricao,
      dia_de_vencimento,
      parcelas,
      valor,
      user_id
    }) {
      if (!titulo || !dia_de_vencimento || !parcelas || !user_id || !valor) {
        throw new Error("N\xE3o esque\xE7a de preencher algumas inform\xE7\xF5es");
      }
      const efetuado = yield prisma_default.pagamento.create({
        data: {
          titulo,
          descricao,
          dia_de_vencimento,
          parcelas,
          valor,
          user_id
        }
      });
      return efetuado;
    });
  }
};

// src/controllers/Compras/CreateComprarController.ts
var CreateComprarController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const user_id = req.user_id;
      const { titulo, descricao, parcelas, dia_de_vencimento, valor } = req.body;
      const inicializacao = new CreateComprarService();
      const cadastrado = yield inicializacao.execute({
        titulo,
        descricao,
        dia_de_vencimento,
        parcelas,
        valor,
        user_id
      });
      return res.json(cadastrado);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateComprarController
});
