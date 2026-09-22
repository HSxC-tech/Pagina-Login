const usuarios = [
    {
        nome: "Higor",
        email: "teste@gmail.com",
        senha: "teste@123"
    }
]

const formLogin = document.querySelector("#login");

//Função para conferir dados do login
formLogin.addEventListener("submit", (event) => {
    console.log("Formulário submetido!");
    event.preventDefault();
    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;

    for (let i=0; i <usuarios.length; i++) { 
        const usuarioID = usuarios[i];

        if (usuarioID.email === email && usuarioID.senha === senha)
            console.log("Login bem-sucedido!");
            break;
    }
});

const formSignup = document.querySelector("#signup");

formSignup.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.querySelector("#nomeSignup").value;
    const email = document.querySelector("#emailSignup").value;
    const senha = document.querySelector("#senhaSignup").value;
    const senhaRepeat = document.querySelector("#senhaRepeatSignup").value;

    const usuarioID_new = {
            nome: nome,
            email: email,
            senha: senha
        }
    
    if ( senha === senhaRepeat) {
        usuarioCadastro();
        usuarios.push(usuarioID_new)
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        console.log("Cadastro bem-sucedido!");
    }
    else {
        console.log("As senhas devem ser iguais!");
    } 



});
/*Função para os cadastros dos usuários*/
function usuarioCadastro(nome, email, senha) {
    const usuariosSalvos = localStorage.getItem("usuarios");

    if (usuarios === usuariosSalvos) {
        let usuarios = usuariosSalvos;
    }
    else 
        (JSON.parse(usuariosSalvos))
        [
            {
                nome: "Higor",
                email: "teste@gmail.com",
                senha: "teste@123"
            }
        ];  

    
}