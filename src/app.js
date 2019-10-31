var express=require('express');
var path=require('path');
var hbs=require('hbs');
var app=express();
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const viewPath=path.join(__dirname,'../templates/views');
const viewPartialPath=path.join(__dirname,'../templates/partials');
const port=process.env.PORT || 3000;
hbs.registerPartials(viewPartialPath);
app.use(express.static(path.join(__dirname,'../public')));
app.set('view engine','hbs');
app.set('views',viewPath)
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Sravani Gajjala'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        helpText:'THis is some helpful text.'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about',
        name:'Sravani Gajjala'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, placename }={}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location:placename,
                address: req.query.address
            })
        })
    })
})



app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sravani Gajjala',
        errorMessage:'Page Not Found'
    })
})
app.listen(port,(err,s)=>{
    console.log('listening')
})