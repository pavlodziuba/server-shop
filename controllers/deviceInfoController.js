const {DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class deviceInfoController{

    async getInfo(req,res){
        const info = await DeviceInfo.findAll()
        return res.json(info)
    }

}

module.exports = new deviceInfoController()