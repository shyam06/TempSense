const functions = require("firebase-functions");
const {validateTemperature} = require('./validator');
//Importing admin module for accessing Realtime Database
const admin = require('firebase-admin');
admin.initializeApp();

/**
 * @summary
 * HTTPS Cloud Function
 * 
 * This function is exported by index.js, and executed when a 
 * temperature value changes in the sensor. The function accepts
 * the temperature value and updates the realtime database.
 * 
 * @name updateTemperature
 * 
 * @param {object} request  -   Received request object.
 * @param {object} response -   Response object for sending the response.
 * 
 */

exports.updateTemperature = functions.https.onRequest(async (request,response) => {
    try{
        const { error } = validateTemperature.validate(request.body);
        if (error) {
            throw error;
        }
        let roomTemp    = request.body.roomTemp;
        let objectTemp  = request.body.objectTemp;

        let tempObject  = {"roomTemp":roomTemp, "objectTemp":objectTemp};
        await admin.database().ref().update(tempObject);        

        response.status(200).send({
            status:true,
            message:{roomTemp, objectTemp}
        })
    }catch(err){
        response.status(400).send({
            status:false,
            message:err.message
        })
    }
});