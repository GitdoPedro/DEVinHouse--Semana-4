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
const sacar = (conta, valor) => {

    if (validarValor(valor)) {
        
        if (validarSaldo(conta, valor)) {
          let saldoAtual
          const contasAtualizadas = contasClientes.map((c) => {
            if (c.conta === conta) {
              saldoAtual = c.saldo - valor
              return { ...c, saldo: saldoAtual }
            }
            console.log(c)
            return c
          })
    
          contasClientes = contasAtualizadas;
    
          alert(`Saque efetuado com sucesso! Saldo atual: ${saldoAtual}`)
        } else {
          alert('Saldo insuficiente');
        }
      } else {
        alert('Valor inválido');
      }


}
const depositar = (conta,valor) => {
    if (validarValor(valor)){
        const contaCliente = obterConta(conta)

        contaCliente.saldo += valor //alterando direto no objeto o valor da conta 
        
        //const contaCliente = { ...obterConta(conta) };
        //contaCliente.saldo += valor;
    
        //const contasAtualizadas = contasClientes.filter((c) => c.conta !== conta);
       // contasAtualizadas.push(contaCliente);
        //contasClientes = contasAtualizadas;

        alert(`Deposito efetuado com sucesso! Saldo atual : ${contaCliente.saldo}`)


    }else {
        alert('Valor inválido')
    }

}
const consultarSaldo = (conta) => {
    const contaCliente = obterConta(conta)
    alert(`Saldo atual: ${contaCliente.saldo}`)
}

const validarValor = (valor) => {
    if (!isNaN(valor) && valor > 0){
        return true
    }
}

const validarSaldo = (conta, valor) => {
    const contaCliente = obterConta(conta)
    return contaCliente.saldo >= valor
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