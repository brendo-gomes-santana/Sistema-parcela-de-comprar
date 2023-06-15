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

// src/controllers/Users/EsqueceuSenhaUserController.ts
var EsqueceuSenhaUserController_exports = {};
__export(EsqueceuSenhaUserController_exports, {
  EsqueceuSenhaUserController: () => EsqueceuSenhaUserController
});
module.exports = __toCommonJS(EsqueceuSenhaUserController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/service/User/EsqueceuSenhaService.ts
var import_bcryptjs = require("bcryptjs");
var EsqueceuSenhaService = class {
  ParteI(email, data_de_nascimento) {
    return __async(this, null, function* () {
      if (!email || !data_de_nascimento) {
        throw new Error("Preenchar os campos");
      }
      const ExisteUser = yield prisma_default.user.findFirst({
        where: {
          email,
          data_de_nascimento
        },
        select: {
          id: true,
          email: true,
          nome: true,
          senha: true
        }
      });
      if (!ExisteUser) {
        throw new Error("N\xE3o existe email/data no nosso sistema cadastrado");
      }
      return ExisteUser;
    });
  }
  ParteII(codigo, NovaSenha, Confirmacao) {
    return __async(this, null, function* () {
      const VerificandoSeSenhaExiste = yield prisma_default.user.findFirst({
        where: { senha: codigo }
      });
      if (!VerificandoSeSenhaExiste) {
        throw new Error("Codigo incorreto");
      }
      if (NovaSenha != Confirmacao) {
        throw new Error("As duas senha n\xE3o partem");
      }
      const SenhaNova = yield prisma_default.user.update({
        where: { id: VerificandoSeSenhaExiste.id },
        data: {
          senha: yield (0, import_bcryptjs.hash)(Confirmacao, 10)
        },
        select: {
          id: true,
          nome: true,
          email: true
        }
      });
      return SenhaNova;
    });
  }
};

// src/controllers/Users/EsqueceuSenhaUserController.ts
var EsqueceuSenhaUserController = class {
  show(req, res) {
    return __async(this, null, function* () {
      const { data_de_nascimento, email } = req.body;
      const inicializacao = new EsqueceuSenhaService();
      const navegar = yield inicializacao.ParteI(email, data_de_nascimento);
      return res.json(navegar);
    });
  }
  trocar(req, res) {
    return __async(this, null, function* () {
      const { codigo, NovaSenha, Confirmacao } = req.body;
      const inicializacao = new EsqueceuSenhaService();
      const SenhaTrocada = yield inicializacao.ParteII(codigo, NovaSenha, Confirmacao);
      return res.json(SenhaTrocada);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EsqueceuSenhaUserController
});
