const {Rating} = require('../models/models')


class RatingController{
    async create(req,res){
        const {userId,deviceId,message,rate,name} = req.body
        const candidate = await Rating.findOne({where: { userId: userId,  deviceId: deviceId}})
        if(candidate){
            const basket_device = await Rating.update(
                {rate: rate},
                { where: { userId: userId,  deviceId: deviceId}}
            )
            return res.json( basket_device) 
        }
        const rating = await Rating.create({userId,deviceId,message,rate,name})
        return res.json(rating)
    }

    async update(req,res){
        const {userId,deviceId,message,rate} = req.body
        const candidate = await Rating.findOne({where: { userId: userId,  deviceId: deviceId}})
        if(candidate){
            const basket_device = await Rating.update(
                {rate: rate, message: message},
                { where: { userId: userId,  deviceId: deviceId}}
            )
            return res.json( basket_device)
        }
        const rating = await Rating.create({userId,deviceId,message,rate})
        return res.json(rating)
    }
    
    async getAll(req,res){
        const rating = await Rating.findAll()
        return res.json(rating)
    }
    async delete(req,res){ 
        const {id, userId} = req.params
        const rating = await Rating.findOne(
            { where: {deviceId: id, userId: userId}}
        )
        if (rating) {
            await rating.destroy();
          }
        return res.json(rating)
    }
 
}

module.exports = new  RatingController()