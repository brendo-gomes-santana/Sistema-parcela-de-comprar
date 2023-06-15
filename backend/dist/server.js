"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/server.ts
var import_express2 = __toESM(require("express"));
var import_express_async_errors = require("express-async-errors");
var import_cors = __toESM(require("cors"));

// src/router.ts
var import_express = require("express");
var import_multer2 = __toESM(require("multer"));

// src/middlewares/Api_Key.ts
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
function Api_key(req, res, next) {
  const api_key = req.query.api_key;
  if (!api_key) {
    return res.status(401).json({
      error: "Inform a chave de acesso"
    });
  }
  if (api_key != process.env.API_KEY) {
    return res.status(401).json({
      error: "Chave de acesso errada"
    });
  }
  next();
}

// src/middlewares/Auth.ts
var import_jsonwebtoken = require("jsonwebtoken");
var import_dotenv2 = __toESM(require("dotenv"));
import_dotenv2.default.config();
function Auth(req, res, next) {
  return __async(this, null, function* () {
    const authtoken = req.headers.authorization;
    if (!authtoken) {
      res.status(401).json({
        status: "Sem token",
        error: "Sem login"
      });
    }
    const [_, token] = authtoken == null ? void 0 : authtoken.split(" ");
    try {
      const { sub } = (0, import_jsonwebtoken.verify)(
        token,
        process.env.JWT_SECRET
      );
      req.user_id = sub;
      return next();
    } catch (err) {
      return res.status(401).end();
    }
  });
}

// src/config/multerConfig.ts
var import_multer = __toESM(require("multer"));
var import_path = __toESM(require("path"));
var storage = import_multer.default.diskStorage({
  destination: (req, file, callback) => {
    callback(null, import_path.default.resolve("uploads"));
  },
  filename: (req, file, callback) => {
    const fileExtension = import_path.default.extname(file.originalname);
    const fileName = `${req.user_id}${fileExtension}`;
    callback(null, fileName);
  }
});

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

// src/service/User/sessionUserService.ts
var import_bcryptjs2 = require("bcryptjs");
var import_jsonwebtoken2 = require("jsonwebtoken");
var import_dotenv3 = __toESM(require("dotenv"));
import_dotenv3.default.config();
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
      const verificacaoDeSenha = yield (0, import_bcryptjs2.compare)(senha, user.senha);
      if (!verificacaoDeSenha) {
        throw new Error("Senha incorreta");
      }
      const token = (0, import_jsonwebtoken2.sign)(
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

// src/service/User/InforUserService.ts
var InforUserService = class {
  execute(user_id) {
    return __async(this, null, function* () {
      if (!user_id) {
        throw new Error("Informe o token");
      }
      const dados = yield prisma_default.user.findFirst({
        where: { id: user_id }
      });
      return dados;
    });
  }
};

// src/controllers/Users/InforUserController.ts
var InforUserController = class {
  show(req, res) {
    return __async(this, null, function* () {
      const user_id = req.user_id;
      const inicializacao = new InforUserService();
      const dados = yield inicializacao.execute(user_id);
      return res.json(dados);
    });
  }
};

// src/service/User/EsqueceuSenhaService.ts
var import_bcryptjs3 = require("bcryptjs");
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
          senha: yield (0, import_bcryptjs3.hash)(Confirmacao, 10)
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

// src/service/User/InforCodigoUserService.ts
var InforCodigoUserService = class {
  execute(codigo) {
    return __async(this, null, function* () {
      if (!codigo) {
        throw new Error("Informe o id do usu\xE1rio");
      }
      const infor = yield prisma_default.user.findFirst({
        where: { id: codigo },
        select: {
          id: true,
          nome: true,
          email: true
        }
      });
      if (!infor) {
        throw new Error("Codigo errado");
      }
      return infor;
    });
  }
};

// src/controllers/Users/InforCodigoUserController.ts
var InforCodigoUserController = class {
  show(req, res) {
    return __async(this, null, function* () {
      const codigo = req.query.codigo;
      const inicializacao = new InforCodigoUserService();
      const dados = yield inicializacao.execute(codigo);
      return res.json(dados);
    });
  }
};

// src/service/User/AtulizandoUserSerive.ts
var import_bcryptjs4 = require("bcryptjs");
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
          senha: senha && (yield (0, import_bcryptjs4.hash)(senha, 10))
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

// src/service/User/RemoveUserService.ts
var RemoveUserService = class {
  execute(id_user) {
    return __async(this, null, function* () {
      if (!id_user) {
        throw new Error("Informe o usu\xE1rio");
      }
      yield prisma_default.pagamento.deleteMany({
        where: { user_id: id_user }
      });
      yield prisma_default.user.deleteMany({
        where: { id: id_user }
      });
      return { mensage: "Conta Excluida com sucesso" };
    });
  }
};

// src/controllers/Users/RemoveUserController.ts
var RemoveUserController = class {
  remove(req, res) {
    return __async(this, null, function* () {
      const id_user = req.user_id;
      const inicializacao = new RemoveUserService();
      const dados = yield inicializacao.execute(id_user);
      return res.json(dados);
    });
  }
};

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

// src/service/Compras/ListaComprarService.ts
var ListaComprarService = class {
  execute(id_user) {
    return __async(this, null, function* () {
      const lista = yield prisma_default.pagamento.findMany({
        where: { user_id: id_user }
      });
      return lista;
    });
  }
};

// src/controllers/Compras/ListaComprarController.ts
var ListaComprarController = class {
  show(req, res) {
    return __async(this, null, function* () {
      const user_id = req.user_id;
      const inicializacao = new ListaComprarService();
      const lista = yield inicializacao.execute(user_id);
      return res.json(lista);
    });
  }
};

// src/service/Compras/RemoveComprarService.ts
var RemoveComprarService = class {
  execute(id_pagamento) {
    return __async(this, null, function* () {
      const existe = yield prisma_default.pagamento.findFirst({
        where: { id: id_pagamento }
      });
      if (!existe) {
        throw new Error("N\xE3o existe item");
      }
      yield prisma_default.pagamento.delete({
        where: { id: id_pagamento }
      });
      try {
        return { mensagem: "item removido com sucesso" };
      } catch (e) {
        throw new Error("Algo deu errado");
      }
    });
  }
};

// src/controllers/Compras/RemoveComprarController.ts
var RemoveComprarController = class {
  remove(req, res) {
    return __async(this, null, function* () {
      const id_pagamento = req.query.id_pagamento;
      const inicializacao = new RemoveComprarService();
      const Removido = yield inicializacao.execute(id_pagamento);
      return res.json(Removido);
    });
  }
};

// src/router.ts
var router = (0, import_express.Router)();
var uploads = (0, import_multer2.default)({ storage });
router.use(Api_key);
router.post("/create/user", uploads.single("foto"), new createUserController().create);
router.post("/session", new sessionUserController().handle);
router.post("/esqueceu", new EsqueceuSenhaUserController().show);
router.patch("/esqueceu", new EsqueceuSenhaUserController().trocar);
router.get("/infor", new InforCodigoUserController().show);
router.use(Auth);
router.get("/user", new InforUserController().show);
router.patch("/user/atualizando", uploads.single("foto"), new AtualizandoUserController().atulizando);
router.delete("/user/remove", new RemoveUserController().remove);
router.post("/create/pagamento", new CreateComprarController().handle);
router.patch("/pagamento", new PagamentoComprarController().handle);
router.get("/lista/pagamento", new ListaComprarController().show);
router.delete("/remove/pagamento", new RemoveComprarController().remove);

// src/server.ts
var app = (0, import_express2.default)();
app.use(import_express2.default.json());
app.use((0, import_cors.default)());
app.use("/foto", import_express2.default.static("uploads"));
app.use(router);
app.use((err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message
    });
  }
});
app.listen(3333, () => console.log("Servidor online"));
