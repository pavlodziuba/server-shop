const uuid = require('uuid');
const path = require('path');
const {Device, DeviceInfo} = require('../models/models');
const ApiError = require('../error/ApiError');
const Sequelize = require('sequelize')
const cloudinary  = require('cloudinary');

const Op = Sequelize.Op

class DeviceController{
    async create(req,res, next){

        cloudinary.config({ 
            cloud_name: 'df5q25ln6', 
            api_key: '266328853326644', 
            api_secret: process.env.SECRET_PHOTO_KEY
        });

        try{
            let {name,price,brandId, typeId,info} = req.body
            let fileName = uuid.v4() + ".jpg"
            const {img} = req.files
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            // Upload an image
            const uploadResult = await cloudinary.uploader
            .upload(
                fileName, {
                    public_id: fileName,
                }
            )
            .catch((error) => {
                console.log(error);
            });
            console.log(uploadResult);

            const device = await Device.create({name, price, brandId, typeId, img: uploadResult})
            if(info){
                info = JSON.parse(info)
                info.forEach(i => 
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            } 
            
            return res.json(device)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async update(req,res, next){
        cloudinary.config({ 
            cloud_name: 'df5q25ln6', 
            api_key: '266328853326644', 
            api_secret: process.env.SECRET_PHOTO_KEY
        });
        try{
            const {id} = req.params
            let {name,price,brandId, typeId,info,rating} = req.body
            try{
                let fileName = uuid.v4() + ".jpg"
                const {img} = req.files
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
                // Upload an image
                const uploadResult = await cloudinary.uploader
                .upload(
                    fileName, {
                        public_id: fileName,
                    }
                )
                .catch((error) => {
                    console.log(error);
                });
                console.log(uploadResult);
                const device = await Device.update(
                    {name, price, brandId, typeId, rating, img: uploadResult},
                    { where: {id} }
                  )
                if(info){
                    info = JSON.parse(info)
                    DeviceInfo.destroy({
                        where: {deviceId: id},
                    }) 
                    info.forEach(i => {
                        	DeviceInfo.create({
                            title: i.title,
                            description: i.description,
                            deviceId: id
                        }) 
                    })
                }
                
                return res.json(device)
            }catch{
                const device = await Device.update(
                    {name, price, brandId, typeId, rating},
                    { where: {id} }
                  )
                if(info){
                    info = JSON.parse(info)
                    DeviceInfo.destroy({
                        where: {deviceId: id},
                    }) 
                    info.forEach(i => {
                        	DeviceInfo.create({
                            title: i.title,
                            description: i.description,
                            deviceId: id
                        }) 
                    })
                }
                
                return res.json(device)
            }
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req,res){
        let {price,brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 999999999
        let min,max
        if(price == undefined){
           min = 0
           max = 999999999
        }else{
            min = price[0]
            max = price[1]
        }

        let offset = page * limit - limit;
        let devices;
        if(!brandId && !typeId){
            devices = await Device.findAndCountAll({where:{price:{[Op.gte]: min,[Op.lte]: max}},limit, offset});
        }
        if(!brandId && typeId){
            devices = await Device.findAndCountAll({where:{price:{[Op.gte]: min,[Op.lte]: max},typeId},limit, offset})
        }
        if(brandId && !typeId){
            devices = await Device.findAndCountAll({where:{price:{[Op.gte]: min,[Op.lte]: max},brandId},limit, offset})
        }
        if(brandId && typeId){
            devices = await Device.findAndCountAll({where:{price:{[Op.gte]: min,[Op.lte]: max},brandId,typeId},limit, offset})
        }
        return res.json(devices)
    }
    async getOne(req,res){
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as:'info'}]

            },
        )
        return res.json(device)
    }
    async delete(req,res){
        const {id} = req.params
        const device = await Device.destroy(
            {
                where: {id},
            },
        )
        return res.json(device)
    }
}

module.exports = new DeviceController()