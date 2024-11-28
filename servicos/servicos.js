import dados from '../dados/dados.js'; 
  // Ou o nome do seu arquivo

// Retorna todos os dados de inflação
export const retornaColecaoCompleta = () => {
    return historicoInflacao;
}

// Retorna os dados de inflação de um ano específico
export const retornaPorAno = (ano) => {
    const resultado = parseInt(ano) > 2014 && parseInt(ano) < 2024 ? parseInt(ano) : null;
    return resultado ? historicoInflacao.filter(dado => dado.ano === resultado) : "Ano inválido";
}

// Retorna os dados de inflação com base no ID
export const retornaPorId = (id) => {
    return historicoInflacao.find(dado => dado.id === Number(id));
}

// Calcula o IPCA acumulado com base em parâmetros de data e valor
export const retornaIpcaAcumulado = (valorInicial, mesInicial, mesFinal, anoInicial, anoFinal) => {
    let IpcaAcumulado = 1;
    let IpcaAtual;
    const idInicial = historicoInflacao.find(dado => dado.mes === mesInicial && dado.ano === anoInicial)?.id;
    const idFinal = historicoInflacao.find(dado => dado.mes === mesFinal && dado.ano === anoFinal)?.id;

    if (!idInicial || !idFinal) {
        return "ID de início ou fim não encontrado";
    }

    for (let index = idInicial; index <= idFinal; index++) {
        if (index === 62) index = 63; // Evita o problema de IDs repetidos (se aplicável)
        IpcaAtual = 1 + (historicoInflacao.find(dado => dado.id === index).ipca / 100);
        IpcaAcumulado *= IpcaAtual;
    }

    return `R$${(valorInicial * IpcaAcumulado).toFixed(2).replace(".", ",")}`;
}
