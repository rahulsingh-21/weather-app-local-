const request = require('request')

const forecast = (longitude,latitude,callback) =>{

    const url='https://api.darksky.net/forecast/3ab43f000baec367194632e5378487ef/'+longitude+','+latitude;
    request({url:url, json:true},(error,response)=>{
        if (error) {
            callback('Cant reach Weather Station',undefined)
        } else if (response.body.error) {
            callback('cant get the location',undefined)
        } else {
            const data = response.body.currently;
            callback(undefined,"It is currently "+data.temperature+" degrees out. There is a "+data.precipProbability+"% chance of rain.")
            
        }
    })
}

module.exports = forecast