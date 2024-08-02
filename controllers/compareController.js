const {Compare} = require('../models/models')
const ApiError = require('../error/ApiError');

class CompareController{
    async create(req,res,next){
        const {userId,deviceId, typeId} = req.body
        const candidate = await Compare.findOne({where: { userId: userId,  deviceId: deviceId,  typeId: typeId}})
        if(candidate){
            return next(ApiError.badRequest('Товар уже в сравнении'))
        }
        const compare = await Compare.create({userId,deviceId,typeId})
        return res.json(compare)
    }
    async getAll(req,res){
        const compare = await Compare.findAll()
        return res.json(compare)
    }
    async delete(req,res){ 
        const {id} = req.params
        const compare = await Compare.destroy(
            {  
                where: {id},   
            },  
        ) 
        return res.json(compare)
    } 

}

module.exports = new  CompareController()