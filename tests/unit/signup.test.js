const test = require("node:test");
const assert = require("node:assert/strict");

function verificarEmailExistente(usuarios, email) {
  const usuarioEncontrado = usuarios.find((usuario) => usuario.email === email);
  if (usuarioEncontrado != null) {
    return { ok: false, mensagem: "Email já cadastrado" };
  }
  return { ok: true, mensagem: "Email disponível" };
}

test("retorna erro quando o email já existe", () => {
  const usuarios = [{ nome: "Teste", email: "teste@gmail.com", senha: "123" },
                    { nome: "Teste1", email: "teste1@gmail.com", senha: "123" }];
  const resultado = verificarEmailExistente(usuarios, "teste1@gmail.com");

  assert.equal(resultado.ok, false);
  assert.equal(resultado.mensagem, "Email já cadastrado");
});

test("permite quando o email não existe", () => {
  const usuarios = [{ nome: "Teste", email: "teste@gmail.com", senha: "123" }];
  const resultado = verificarEmailExistente(usuarios, "novo@gmail.com");

  assert.equal(resultado.ok, true);
});
