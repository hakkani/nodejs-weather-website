const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=0145e67e212be7422c4c29669f4ef7be&query=${latitude},${longitude}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another location!", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently Tempareture: ${body.current.temparature} degree and Humidity: ${body.current.humidity}. It feel likes ${body.current.feelslike} degree out.`
      );
    }
  });
};

module.exports = forecast;

// humidity
// temperature
//
