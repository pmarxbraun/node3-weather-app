const request = require("request");

const geocode = (adress, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(adress) +
    ".json?access_token=pk.eyJ1IjoicGJyYXVuIiwiYSI6ImNrZDh6b2QzNjBvbGsyenM4OGZtd3NpbWkifQ.WtyCQtvsxD34lAmL8Db-6Q&language=fr&limit=1";

  request({ url, json: true }, (error, { body }) => {
    const { features } = body;

    if (error) {
      callback("Wrong query", undefined);
    } else if (features.length === 0) {
      callback("Unable to find the address", undefined);
    } else {
      callback(undefined, {
        place_name_fr: features[0].place_name_fr,
        lat: features[0].center[0],
        long: features[0].center[1],
      });
    }
  });
};

module.exports = geocode;
