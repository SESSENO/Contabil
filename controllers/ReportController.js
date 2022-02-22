const ContSchema = require("../models/ContModels");

class ReportController{
    static async showOpcode(req, res){
        const{opcode} = req.params;
        const cont = await ContSchema.find({opcode:opcode});
        res.status(202).json(cont);
    }

    static async showAvExpenses(req, res){
        let soma =0;
        const cont = await ContSchema.find({opcode: false});
        for(let opcode of cont){ soma = soma + opcode.value}
        let media = soma/cont.length;
        res.status(202).json(media);
    }

    static async showAvRevenue(req, res){
        let soma =0;
        const cont = await ContSchema.find({opcode: true});
        for(let opcode of cont){ soma = soma + opcode.value}
        let media = soma/cont.length;
        res.status(202).json(media);
    }
    
    static async monthReport(req, res){
        let {month, year, opcode}  = req.params;

        if(opcode != 1 && opcode!=0)
        {
            res.status(402).json({message: `lista-parâmetros-inválidos-nulo`});
            return
        }

        const desc= [];
        let soma =0;
        const cont = await ContSchema.find({date: {$gte: new Date(`${year},${month-1},30`), $lte: new Date(`${year},${month},30`)}}).find({opcode:`${opcode}`});
        for(let desc of cont){soma += desc.value};
        console.log(cont, month, year, opcode);


        if(opcode == true){ 
            res.status(201).json({histórico_receitas : cont, receitas: `RECEITAS ${month}/${year} : R$ ${soma}`});
            return
        }else{
            res.status(201).json({histórico_despesas : cont, despesas: `DESPESAS ${month}/${year} : R$ ${soma}`});

        }

    }

    static async balanceReport(req, res){
        let {month, year}  = req.params;

        const descR = [];
        const descD = [];
        let somaR =0;
        let somaD =0;
        const contR = await ContSchema.find({date: {$gte: new Date(`${year},${month-1},30`), $lte: new Date(`${year},${month},30`)}}).find({opcode: 1});
        for(let descR of contR){somaR += descR.value};

        const contD = await ContSchema.find({date: {$gte: new Date(`${year},${month-1},30`), $lte: new Date(`${year},${month},30`)}}).find({opcode: 0});
        for(let descD of contD){somaD += descD.value};
        console.log(month, year);

        let resultado = parseFloat(somaR - somaD);
        console.log(resultado);

        res.status(201).json({despesas: `DESPESAS ${month}/${year} : R$ ${somaD}`, receitas: `RECEITAS ${month}/${year} : R$ ${somaR}`, resultado});
        
        }
}


module.exports = ReportController;