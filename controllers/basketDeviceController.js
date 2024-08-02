const {BasketDevice} = require('../models/models')

class BasketDeviceController{
    async create(req,res,next){
        const {basketId,deviceId} = req.body
        const candidate = await BasketDevice.findOne({where: { basketId: basketId,  deviceId: deviceId}})
        if(candidate){
            const basket_device = await BasketDevice.update(
                {deviceNum: candidate.deviceNum+1},
                { where: {basketId,deviceId}}
            )
            return res.json( basket_device)  
        }
        const basket_device = await BasketDevice.create({basketId,deviceId})
        return res.json( basket_device)
    }
    async update(req,res){
        const {basketId,deviceId,num} = req.body 
        if(num > 0){
            const basket_device = await BasketDevice.update(
                {deviceNum: num},
                { where: {basketId,deviceId}}    
            ) 
            return res.json( basket_device)
        }
        const candidate = await BasketDevice.findOne({where: { basketId: basketId,  deviceId: deviceId}})
        const basket_device = await BasketDevice.update(
            {deviceNum: candidate.deviceNum-1},
            { where: {basketId,deviceId}}
        )
        return res.json( basket_device)
    }
    async getAll(req,res){
        const basket_device = await BasketDevice.findAll()
        return res.json(basket_device)
    }
    async delete(req,res){ 
        const {id} = req.params
        const device = await BasketDevice.destroy(
            {  
                where: {id},  
            },  
        ) 
        return res.json(device)
    } 

}

module.exports = new  BasketDeviceController()