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

// src/controllers/Compras/PagamentoComprarController.ts
var PagamentoComprarController_exports = {};
__export(PagamentoComprarController_exports, {
  PagamentoComprarController: () => PagamentoComprarController
});
module.exports = __toCommonJS(PagamentoComprarController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/service/Compras/PagamentoComprarService.ts
var PagamentoComprarService = class {
  execute(id_pagamento) {
    return __async(this, null, function* () {
      const dados = yield prisma_default.pagamento.findFirst({
        where: { id: id_pagamento }
      });
      if (!dados) {
        throw new Error("N\xE3o existe esse item");
      }
      const atualizando = yield prisma_default.pagamento.update({
        where: { id: id_pagamento },
        data: {
          parcelas: (dados == null ? void 0 : dados.parcelas) - 1
        }
      });
      if (atualizando.parcelas === 0) {
        yield prisma_default.pagamento.delete({
          where: { id: id_pagamento }
        });
        return { mensagem: "Voc\xEA terminou de pagar" };
      }
      return atualizando;
    });
  }
};

// src/controllers/Compras/PagamentoComprarController.ts
var PagamentoComprarController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const id_pagamento = req.query.id_pagamento;
      const inicializacao = new PagamentoComprarService();
      const atualizado = yield inicializacao.execute(id_pagamento);
      return res.json(atualizado);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PagamentoComprarController
});
