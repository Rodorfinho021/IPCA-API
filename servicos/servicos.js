import dados from '../dados/dados.js';
import historicoInflacao from '../dados/historicoInflacao.js';


export const retornaColecaoCompleta = () => {
    return historicoInflacao;
}

export const retornaPorAno = (ano) => {
    const resultado = parseInt(ano) > 2014 && parseInt(ano) < 2024 ? parseInt(ano) : null;
    return resultado ? historicoInflacao.filter(dado => dado.ano === resultado) : "Ano inválido";
}


export const retornaPorId = (id) => {
    return historicoInflacao.find(dado => dado.id === Number(id));
}


export const retornaIpcaAcumulado = (valorInicial, mesInicial, mesFinal, anoInicial, anoFinal) => {
    let IpcaAcumulado = 1;
    let IpcaAtual;
    const idInicial = historicoInflacao.find(dado => dado.mes === mesInicial && dado.ano === anoInicial)?.id;
    const idFinal = historicoInflacao.find(dado => dado.mes === mesFinal && dado.ano === anoFinal)?.id;

    if (!idInicial || !idFinal) {
        return "ID de início ou fim não encontrado";
    }

    for (let index = idInicial; index <= idFinal; index++) {
        if (index === 62) index = 63; 
        IpcaAtual = 1 + (historicoInflacao.find(dado => dado.id === index).ipca / 100);
        IpcaAcumulado *= IpcaAtual;
    }

    return `R$${(valorInicial * IpcaAcumulado).toFixed(2).replace(".", ",")}`;
}
