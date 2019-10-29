const request = require('request')

const geocode = (address, callback) => {
    const mapBoxURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic3JhdmFuaWciLCJhIjoiY2sxdWh4OTVmMDZrODNtcW0yd2J2MGp6aCJ9._-JYgNMCQ9UjihhYNhQd1A&limit=1'
    request.get({url:mapBoxURL,json:true},(error,response)=>{
        if(error){
            callback('unable to connect',undefined)
        }
        else if(response.body.features.length===0){
            callback('location not found',undefined)
        }else{callback(undefined,{
            latitude:response.body.features[0].center[1],
            longitude:response.body.features[0].center[0],
            placename:response.body.features[0].place_name
        })
    }
    })
}

module.exports = geocode