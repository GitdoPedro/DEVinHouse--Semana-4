let contasClientes = []


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
            senha:   evento.target.confirm_password.value,
            conta:   Math.floor(1000 + Math.random() * 90000),
            saldo:   0
        }

        contasClientes.push(conta)
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
    console.log(contasClientes)
    


}

const obterConta = (conta) =>{
    const contaCliente = contasClientes.find((c)=> c.conta === conta)
    return contaCliente
}
const sacar = () => {}
const depositar = () => {}
const consultarSaldo = (conta) => {
    const contaCliente = obterConta(conta)
    alert(`Saldo atual: ${contaCliente.saldo}`)
}


const validarConta = (conta,senha) =>{
    const contaCliente = obterConta(conta)
    
    if (contaCliente && contaCliente.senha === senha){
        return true
    }
        return false
}

const efetuarOperacao = (evento) => {
    evento.preventDefault()
    console.log(contasClientes)
  
    const conta = parseInt(evento.target.conta.value)
    const senha = evento.target.senha.value
    const valor = parseInt(evento.target.valor.value)
  
    const contaValida = validarConta(conta, senha)
  
    if (contaValida) {
      switch (evento.target.operacao.value) {
        case 'SAQUE':
          sacar(conta, valor);
          break
        case 'DEPOSITO':
          depositar(conta, valor)
          break
        case 'SALDO':
          consultarSaldo(conta)
          break
        default:
          alert('Operação inválida')
      }
    } else {
      alert('Conta ou senha inválida')
    }
  }

const operacao = document.getElementById('operacao')
operacao.addEventListener('change',trocarOperacao)

const formAcoes = document.getElementById('form-acoes')
formAcoes.addEventListener('submit',efetuarOperacao)