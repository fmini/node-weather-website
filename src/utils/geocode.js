const request = require ('request')

const geocode = (address, anyDangNameYouWant) => { // this gets the address and callback function defined anonymously in the geocode call and names the callback function 'callback'
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiZm1pbmkiLCJhIjoiY2s2Zjd3YTRwMjV1dTNrcGp2ajcxcmI5dyJ9.U-F5KbekPS0viakTEellKw&limit=1'
  
  request({url, json: true}, (error, {body}) => {
    if (error) {
      anyDangNameYouWant('Unable to connect to location services!', undefined)
    } else if (body.features.length === 0) {
      anyDangNameYouWant('Unable to find location. Try another search.', undefined)
    } else {
      anyDangNameYouWant(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}



module.exports = geocode