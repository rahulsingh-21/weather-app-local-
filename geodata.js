const request =require('request')

const geodata = (address,callback) =>{    

    const geodataURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYTIwMTdjc2U1MDI4IiwiYSI6ImNrNXFvNjZnOTA0OHczbW84cWlxam54aWEifQ.oRnf-N2gODteJaKolxBx1w';
    request({url:geodataURL ,json:true},(error,response)=>{
        if (error) {
            callback('Cant reach Mapbox',undefined)
        } else if (response.body.features.length===0) {
            callback('cant get longitude and latitude',undefined)
        } else {
            callback(undefined, {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geodata