const dadosNoDisco = localStorage.getItem("usuarios");
let usuarios = dadosNoDisco ? JSON.parse(dadosNoDisco) : [
    {
        nome: "Teste",
        email: "teste@gmail.com",
        senha: "teste@123"
    }
];

//Função para conferir dados do login


const formLogin = document.querySelector("#login");

//Fomulário de Login
formLogin.addEventListener("submit", (event) => {
    const msgLogin = document.querySelector('#msgLogin')
    event.preventDefault();
    
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;

    // Procura se existe alguém com esse email:
    const usuarioEncontrado = usuarios.find(u => u.email === email);

    if (!usuarioEncontrado) {
        msgLogin.textContent = "Email não cadastrado!";
        msgLogin.className = "mensagem erro";
    } else if (usuarioEncontrado.senha !== senha) {
        msgLogin.textContent = "Senha incorreta!";
        msgLogin.className = "mensagem erro";
    } else {
        msgLogin.textContent = "Login realizado com sucesso!";
        msgLogin.className = "mensagem sucesso";
    }
});

//Fomulário de Cadastro 
const formSignup = document.querySelector("#signup");

formSignup.addEventListener("submit", (event) => {
    const msgSignup = document.querySelector("#msgSignup");
    event.preventDefault();

    msgSignup.textContent = "Signup ativado";
    msgSignup.className = "mensagem sucesso";
    const nome = document.querySelector("#nomeSignup").value;
    const email = document.querySelector("#emailSignup").value;
    const senha = document.querySelector("#senhaSignup").value;
    const senhaRepeat = document.querySelector("#senhaRepeatSignup").value;

    const usuarioID_new = {
            nome: nome,
            email: email,
            senha: senha
        }

    const usuarioEncontrado = usuarios.find((usuario) => {
        return usuario.email === email;
    });    
    if (usuarioEncontrado != null) {
        msgSignup.textContent = "Email já cadastrado";
        msgSignup.className = "mensagem erro";
    }
    else if ( senha === senhaRepeat) {
        usuarios.push(usuarioID_new)
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        msgSignup.textContent = "Cadastro realizado com sucesso!";
        msgSignup.className = "mensagem sucesso";
    }
    else {
        msgSignup.textContent = "As senhas não conferem!";
        msgSignup.className = "mensagem erro";
    } 
});
//Funções do Menuside
const menuside = document.querySelector("#menuside");

menuside.addEventListener("click", (event) =>{
    if (event.target.id === "ResetDB") {
        msgMenuside.textContent = "Botão de reset ativado";
        msgMenuside.className = "mensagem sucesso";

        usuarios = [ 
            {
                nome: "Teste",
                email: "teste@gmail.com",
                senha: "Teste@123456"
            }
        ];
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        msgMenuside.textContent = "Banco resetado";
        msgMenuside.className = "mensagem sucesso";
    }

    if (event.target.id === "LoginEmailExistente") {
        const emailAleatorio = usuarios[Math.floor(Math.random() * usuarios.length)].email;
        const senhaAleatoria = Math.random().toString(36).slice(2, 10);

        document.querySelector("#nomeSignup").value = "Teste" + Math.floor(Math.random() * 10000);
        document.querySelector("#emailSignup").value = emailAleatorio;
        document.querySelector("#senhaSignup").value = senhaAleatoria;
        document.querySelector("#senhaRepeatSignup").value = senhaAleatoria;

        formSignup.querySelector('button[type="submit"]').click();
    }
});