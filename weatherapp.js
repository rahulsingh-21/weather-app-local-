const geodata = require('./geodata.js')
const forecast = require('./forecast.js')

const location= process.argv[2]
if (!location) {
    console.log('Please provide the location')
} else {
    geodata(location,(error,data)=>{
        if (error) {
             return console.log(error)
        } 
        
        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error) {
                return console.log(error)
            }
            console.log(data.location)
            console.log(forecastData)
        })
    })
    
}


