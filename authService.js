import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

class FirebaseAuthService {
    #auth;

    constructor(app){
        this.#auth = getAuth(app);
    }

    // Criar usuario
    criarUsuarioComEmailESenha(email, senha){
        return createUserWithEmailAndPassword(this.#auth, email, senha)
            .then((credencial) => {
                console.log("Usuário criado:", credencial.user);
                return { sucesso: true, usuario: credencial.user };
            })
            .catch((erro) => {
                console.error("Erro ao criar usuário:", erro);
                return { sucesso: false, erro };
            });
    }

    // Fazer login
    login(email, senha) {
        return signInWithEmailAndPassword(this.#auth, email, senha)
            .then((credencial) => {
                console.log("Login realizado:", credencial.user);
                return { sucesso: true, usuario: credencial.user };
            })
            .catch((erro) => {
                console.error("Erro ao fazer login:", erro);
                return { sucesso: false, erro };
            });
    }
}

export default FirebaseAuthService;
