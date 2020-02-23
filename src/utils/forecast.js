const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/a28cbe35484053d497b13bc5f03f4f7b/'+ latitude+ ',' + longitude
  
  request({url, json:true}, (error, {body}) => {
    if(error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find provided location.', undefined)
    } else {
      callback(undefined, `${body.daily.data[0].summary} It is currentyly ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`)
    }
  })
}



module.exports = forecast