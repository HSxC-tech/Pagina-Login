const { test, describe } = require("node:test");
const assert = require("node:assert/strict");

function verificarEmailExistente(usuarios, email) {
  const usuarioEncontrado = usuarios.find((usuario) => usuario.email === email);
  if (usuarioEncontrado != null) {
    return { ok: false, mensagem: "Email já cadastrado" };
  }
  return { ok: true, mensagem: "Email disponível" };
}

function verificarSenha(senha) {
  if (senha.includes(" ")) {
    return { ok: false, mensagem: "A senha não pode conter espaço" };
  }
  if (!/[a-z]/.test(senha)) {
    return { ok: false, mensagem: "A senha deve conter pelo menos uma letra minúscula" };
  }
  if (!/[A-Z]/.test(senha)) {
    return { ok: false, mensagem: "A senha deve conter pelo menos uma letra maiúscula" };
  }
  if (!/[^a-zA-Z0-9]/.test(senha)) {
    return { ok: false, mensagem: "A senha deve conter pelo menos um caractere especial" };
  }
  return { ok: true, mensagem: "Senha válida" };
}

function verificarSenhaRepetida(senha, repetirSenha) {
  if (senha === repetirSenha) {
    return { ok: true, mensagem: "A senha repetida é igual a senha" };
  } else {
    return { ok: false, mensagem: "A senha repetida não é igual a senha" };
  }
}

describe("signup.test.js", () => {
  describe("Testando testes estáticos", () => {
    test("retorna erro quando o email já existe", () => {
      const usuarios = [
        { nome: "Teste", email: "teste@gmail.com", senha: "123" },
        { nome: "Teste1", email: "teste1@gmail.com", senha: "123" },
      ];
      const resultado = verificarEmailExistente(usuarios, "teste1@gmail.com");

      assert.equal(resultado.ok, false);
      assert.equal(resultado.mensagem, "Email já cadastrado");
    });

    test("permite quando o email não existe", () => {
      const usuarios = [{ nome: "Teste", email: "teste@gmail.com", senha: "123" }];
      const resultado = verificarEmailExistente(usuarios, "novo@gmail.com");

      assert.equal(resultado.ok, true);
    });

    test("retorna erro quando a senha repetida não é igual à senha", () => {
      const resultado = verificarSenhaRepetida("123", "456");

      assert.equal(resultado.ok, false);
      assert.equal(resultado.mensagem, "A senha repetida não é igual a senha");
    });

    test("permite quando a senha repetida é igual à senha", () => {
      const resultado = verificarSenhaRepetida("123", "123");

      assert.equal(resultado.ok, true);
      assert.equal(resultado.mensagem, "A senha repetida é igual a senha");
    });
  });

  describe("Testando testes dinâmicos", () => {
    const usuariosDinamicos = [
      { nome: "Teste", email: "teste@gmail.com", senha: "123" },
      { nome: "Teste1", email: "teste1@gmail.com", senha: "123" },
    ];

    const casos = [
      {
        nome: "retorna erro quando o email já existe",
        email: "teste@gmail.com",
        ok: false,
        mensagem: "Email já cadastrado",
      },
      {
        nome: "permite quando o email não existe",
        email: "outro@gmail.com",
        ok: true,
        mensagem: "Email disponível",
      },
    ];

    for (const caso of casos) {
      test(caso.nome, () => {
        const resultado = verificarEmailExistente(usuariosDinamicos, caso.email);

        assert.equal(resultado.ok, caso.ok);
        assert.equal(resultado.mensagem, caso.mensagem);
      });
    }

    const casosSenha = [
      {
        nome: "senha e senha repetida são iguais",
        senha: "123456",
        repetirSenha: "123456",
        ok: true,
        mensagem: "A senha repetida é igual a senha",
      },
      {
        nome: "senha com espaço no meio e outra sem espaço",
        senha: "123 456",
        repetirSenha: "123456",
        ok: false,
        mensagem: "A senha não pode conter espaço",
      },
      {
        nome: "senha começa com espaço e repetida não",
        senha: " 123",
        repetirSenha: "123",
        ok: false,
        mensagem: "A senha não pode conter espaço",
      },
      {
        nome: "ambas começam com espaço",
        senha: " 123",
        repetirSenha: " 123",
        ok: false,
        mensagem: "A senha não pode conter espaço",
      },
      {
        nome: "senha termina com espaço e repetida não",
        senha: "123 ",
        repetirSenha: "123",
        ok: false,
        mensagem: "A senha não pode conter espaço",
      },
      {
        nome: "ambas terminam com espaço",
        senha: "123 ",
        repetirSenha: "123 ",
        ok: false,
        mensagem: "A senha não pode conter espaço",
      },
      {
        nome: "senha começa e termina com espaço e repetida não",
        senha: " 123 ",
        repetirSenha: "123",
        ok: false,
        mensagem: "A senha não pode conter espaço",
      },
      {
        nome: "ambas começam e terminam com espaço",
        senha: " 123 ",
        repetirSenha: " 123 ",
        ok: false,
        mensagem: "A senha não pode conter espaço",
      },
      {
        nome: "caracteres especiais iguais",
        senha: "abc@#!$%",
        repetirSenha: "abc@#!$%",
        ok: true,
        mensagem: "A senha repetida é igual a senha",
      },
      {
        nome: "caracteres especiais diferentes",
        senha: "abc@#!$%",
        repetirSenha: "abc@#$%",
        ok: false,
        mensagem: "A senha repetida não é igual a senha",
      },
      {
        nome: "maiúscula vs minúscula",
        senha: "Senha123",
        repetirSenha: "senha123",
        ok: false,
        mensagem: "A senha repetida não é igual a senha",
      },
      {
        nome: "maiúsculas e minúsculas iguais",
        senha: "Senha123",
        repetirSenha: "Senha123",
        ok: true,
        mensagem: "A senha repetida é igual a senha",
      },
    ];

    for (const caso of casosSenha) {
      test(caso.nome, () => {
        const resultado = caso.mensagem === "A senha não pode conter espaço"
          ? verificarSenha(caso.senha)
          : verificarSenhaRepetida(caso.senha, caso.repetirSenha);

        assert.equal(resultado.ok, caso.ok);
        assert.equal(resultado.mensagem, caso.mensagem);
      });
    }
    const casosValidacaoSenha = [
      {
        nome: "senha válida com maiúscula, minúscula e caractere especial",
        senha: "Senha@123",
        ok: true,
        mensagem: "Senha válida",
      },
      {
        nome: "senha sem caractere especial",
        senha: "Senha123",
        ok: false,
        mensagem: "A senha deve conter pelo menos um caractere especial",
      },
      {
        nome: "senha sem letra minúscula",
        senha: "SENHA@123",
        ok: false,
        mensagem: "A senha deve conter pelo menos uma letra minúscula",
      },
      {
        nome: "senha sem letra maiúscula",
        senha: "senha@123",
        ok: false,
        mensagem: "A senha deve conter pelo menos uma letra maiúscula",
      },
    ];

    for (const caso of casosValidacaoSenha) {
      test(caso.nome, () => {
        const resultado = verificarSenha(caso.senha);

        assert.equal(resultado.ok, caso.ok);
        assert.equal(resultado.mensagem, caso.mensagem);
      });
    }
  });
});
