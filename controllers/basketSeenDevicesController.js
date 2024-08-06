const {BasketSeenDevice} = require('../models/models')


class BasketSeenDeviceController{
    async update(req,res){
        const {basketId,deviceIdArr} = req.body
        const amount = await BasketSeenDevice.count({
            where: {basketId: basketId}
        })
        const minId = await BasketSeenDevice.min('id', { where: { basketId: basketId} });
        if(amount<13){
            const candidate = await BasketSeenDevice.findOne({where: { basketId: basketId,  deviceIdArr: deviceIdArr}})
            if(candidate){
                BasketSeenDevice.destroy(
                    {
                        where: { basketId: basketId,  deviceIdArr: deviceIdArr},
                    }, 
                )
            } 
            const basket_seen_device = await BasketSeenDevice.create({basketId,deviceIdArr})
            return res.json( basket_seen_device)
        }else{
            const candidate = await BasketSeenDevice.findOne({where: { basketId: basketId,  deviceIdArr: deviceIdArr}})
            if(candidate){
                BasketSeenDevice.destroy(
                    {
                        where: { basketId: basketId,  deviceIdArr: deviceIdArr},
                    },
                )
            }else{
                BasketSeenDevice.destroy(
                    {
                        where: {id: minId,  },
                    },
                )
            }
            const basket_seen_device = await BasketSeenDevice.create({basketId,deviceIdArr})
            return res.json( basket_seen_device)
        }
    }
    async get(req,res){ 
        const {id} = req.params
        const basket_device = await BasketSeenDevice.findAll({order: [['id', ]], where:{basketId:id}})
        return res.json(basket_device)  
    } 
 
}  

module.exports = new  BasketSeenDeviceController()  