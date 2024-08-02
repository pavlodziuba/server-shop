const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError');

class BrandController{
    async create(req,res,next){
        const {name} = req.body
        const candidate = await Brand.findOne({where: {name}})
        if(candidate){
            return next(ApiError.badRequest('Бренд уже существует'))
        }
        const brand = await Brand.create({name})
        return res.json(brand)
    }
    async getAll(req,res){
        const brands = await Brand.findAll()
        return res.json(brands)
    }
    async delete(req,res){
        const {id} = req.params
        const brands = await Brand.destroy(
            {
                where: {id}, 
            }, 
        )
        return res.json(brands)
    }
}

module.exports = new BrandController()