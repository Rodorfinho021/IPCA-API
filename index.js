import  express  from "express";
import {retornaColecaoCompleta,retornaPorAno,retornaPorId,retornaIpcaAcumulado} from './servicos/servicos.js';



const app = express();


app.get('/historicoIPCA/calculo', (req, res) => {
    let valorInicial = parseInt(req.query.valor)
    let mesInicial = parseInt(req.query.mesInicial)
    let mesFinal = parseInt(req.query.mesFinal)
    let anoInicial = parseInt(req.query.anoInicial)
    let anoFinal = parseInt(req.query.anoFinal)

    if (!(valorInicial || mesInicial || mesFinal || anoInicial || anoFinal)) {
        
        res.status(400).send({'erro':'requisição invalida'})
        console.log(valorInicial,mesInicial,mesFinal,anoInicial,anoFinal)
        

        
    } else if (anoFinal===anoInicial && mesInicial>mesFinal){
        res.status(404).send({'erro':'Mes invalido'})
        console.log(1);
        

    }  else if (anoInicial === 2023 || anoFinal===2023 && mesFinal>5 || mesInicial>5 ){
        res.status(404).send({'erro':'Mes invalido'})
        console.log(2);
        

    }  else if (anoInicial>anoFinal){
        res.status(404).send({'erro':'Ano invalido'})
        console.log(3);

    } else if ( mesInicial > 12 || mesInicial < 1 || mesFinal >12 || mesFinal < 1 ){
        res.status(404).send({'erro':'Mês invalido'})
        console.log(5);
        
    } else if ( anoInicial > 2023 || anoInicial < 2015 || anoFinal >2024){
        res.status(404).send({'erro':'Ano invalido'})
        console.log(5);
        
    } else{
        res.json(retornaIpcaAcumulado(valorInicial,mesInicial,mesFinal,anoInicial,anoFinal))
    }


})



 app.get('/historicoIPCA/:id', (req, res) => {
     const idipca = retornaPorId(req.params.id);

     if (idipca) {
         res.json(idipca);
        
     } else if (isNaN(Number(idipca))) {
         res.status(400).send({'erro':'requisição invalida'});
         console.log(mesFinal)
        
     } else{
         res.status(404).send({'erro':'ID não encontrado'});

     }


})

app.get('/historicoIPCA', (req , res)=>{
    const ano = req.query.ano;
    const resultado = ano ? retornaPorAno(ano) : retornaColecaoCompleta();
        res.json(resultado);
});









app.listen(8080,()=>{
     console.log('servidor iniciado na porta 8080');
});