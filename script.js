let constasClientes = []


const validarSenhasIguais = (evento) => {
    //const senha = document.getElementById('password').value
    //const confirm_password = document.getElementById('password').value
    if (evento.target.password.value === evento.target.confirm_password.value){
        return true

    }return false


}


const cadastrarConta = (evento) => {
    evento.preventDefault()
    if(validarSenhasIguais(evento)){
        const conta = {
            nome:    evento.target.nome.value,  
            cpf:     evento.target.cpf.value,
            celular: evento.target.celular.value,
            senha:   evento.target.password.value,
            conta:   Math.floor(1000 + Math.random() * 90000),
            saldo:   0
        };

        constasClientes.push(conta)
        alert(`Conta Criada com sucesso! Número: ${conta.conta}`)

    }else {
        alert('Senhas precisam ser iguais!')
    }
}

const form = document.getElementById('form')
form.addEventListener('submit',cadastrarConta)

// Funções Operações

const trocarOperacao = (evento) => {
    const valor = document.getElementById('valor')
    valor.disabled = evento.target.value === "SALDO"
    


}




const operacao = document.getElementById('operacao')
operacao.addEventListener('change',trocarOperacao)