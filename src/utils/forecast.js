const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=d86e94a19f23c2dfc3cf46babf54a550&query=" +
    lat +
    "," +
    long;

  request({ url, json: true }, (error, { body }) => {
    const { current, location } = body;

    if (error) {
      callback("Unable to connect", undefined);
    } else if (body.error) {
      callback("Unable to find location. Check your query", undefined);
    } else {
      callback(undefined, {
        temp: current.temperature,
        name: location.name,
        prec: current.precip,
      });
    }
  });
};

module.exports = forecast;
