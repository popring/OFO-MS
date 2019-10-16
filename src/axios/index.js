import JsonP from 'jsonp'

export default {
  static jsonP(options) {
    return new Promise((resolve, reject) => {
      JsonP(options.url, {
        param: 'callback'
      }, function(err, response) {
        // TODO
        // if(err) {
        //   return
        // }
        // https://www.sojson.c
        // http://t.weather.sojson.com/api/weather/city/101030100
      })
    })
  }
}