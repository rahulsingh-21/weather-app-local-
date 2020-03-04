const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geodata = require('./geodata.js')
const forecast = require('./forecast.js')

const app=express()

const publicpath = path.join(__dirname,'../desktop')
const viewspath = path.join(__dirname,'../desktop/templates/views')
const partialpath = path.join(__dirname,'../desktop/templates/partials')

app.set('view engine','hbs')
app.set('views',viewspath)

hbs.registerPartials(partialpath)

app.use(express.static(publicpath))

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'Enter address'
        })
    }

    geodata(req.query.address,(error ,{latitude,longitude,location})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude ,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast :forecastdata,location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast:'Partly cloudy',
    //     location:'Boston',
    //     address: req.query.address
    // })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Rahul Singh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'This is the help page',
        name:'Rahul Singh'
    })
})

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Rahul Singh'
    })
})

app.get('*',(req,res)=>{
    res.send('Error:404 ')
})

app.listen(3000,()=>{
    console.log('port 3000 is running')
})