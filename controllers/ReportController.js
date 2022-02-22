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
    
}


module.exports = ReportController;