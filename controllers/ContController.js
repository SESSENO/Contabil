const e = require("express");
const { response } = require("express");
const ContSchema = require("../models/ContModels");
const ContModels = require("../models/ContModels");


class ContController {

    static async addCont(req, res){
        const { value, title, description, opcode } = req.body;
        let date = req.body.date;
        date = new Date(date);
        let filter = new Date(date);
        const cont = ContModels({date, value, title, description, opcode});
        await cont.save();
        res.status(201).json({message: 'Adicionado, deu certo!!'})
    }

    static async removeCont(req, res){ 
        const {_id} = req.body;

        console.log(_id);

        if(!_id){
            res.status(401).json({message: `parâmetro-remoção-nulo`});
            return
        }
        const cont = await ContSchema.find({_id:_id});
        console.log(cont);

        if(cont == null || !cont || cont == ""){
            res.status(401).json({message: `parâmetro-${_id}-inexistente`});
            return
        }
        
        await ContSchema.findByIdAndDelete(_id);
        
        res.status(202).json({message: `registro- ${_id} - removido`});
    }

    static async updateCont(req, res){
        
        const { _id, date, value, title, description, opcode } = req.body;

        const cont = await ContSchema.find({_id:_id});
        console.log(cont);

        if(cont == null || !cont || cont == ""){
            res.status(401).json({message: `parâmetro-${_id}-inexistente`});
            return
        }

        await ContSchema.findByIdAndUpdate(_id, {value, date,  title, description, opcode});

        res.status(202).json({message: `registro - ${_id} - atualizado`});
    }

    static async showCont(req, res){
        const cont = await ContSchema.find({});
        res.status(202).json(cont);
    }



}


module.exports = ContController;
