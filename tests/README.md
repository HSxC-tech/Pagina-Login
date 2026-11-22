# Testes - Pagina-Login

Organização **por nível** e, dentro de cada nível, **por funcionalidade**:

- `tests/unit/`: testes de regras puras em Node (`node:test`), sem navegador.
  - Ex: `signup.test.js`, `login.test.js`, `menuside.test.js`.
- `tests/e2e/`: testes no navegador real (quando adicionados).

## Como rodar

Dentro de `Pagina-Login/`:

```bash
# Rodar todos os testes unitários
node --test tests/unit/

# Rodar um arquivo específico
node --test tests/unit/signup.test.js
```

## Como adicionar novos testes

1. Escolha o nível (`unit` para lógica pura, `e2e` para tela/navegador).
2. Coloque no arquivo da funcionalidade correspondente (ex: novos casos de cadastro vão em `tests/unit/signup.test.js`).
