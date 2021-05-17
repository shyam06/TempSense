const Joi = require('joi');

/**
 * @summary
 * Validator method for cloud function updateTemperature.
 * 
 * @name validateTemperature
 * 
 */
const validateTemperature = Joi.object().keys({
    roomTemp:Joi.number().required(),
    objectTemp:Joi.number().required()
})

module.exports = {validateTemperature};