const request = require("request");
const APIKEY = "9d14b7a32a3d37f8330861ad86a5fb16";
const geocodeAddress = (address, callback) => {
	const encodedAddress = encodeURIComponent(address);
	request(
		{
			url: `http://api.openweathermap.org/data/2.5/weather?q=${encodedAddress}&appid=${APIKEY}`,
			json: true
		},
		(err, res, body) => {
			if (err) {
				callback("Unable to connect to Open Weather Map servers");
			} else if (body.cod === 404) {
				callback(`${body.message}`);
			} else if (body.cod === 200) {
				const res = {
					lat: body.coord.lon,
					lng: body.coord.lat
				};
				callback(undefined, res);
			}
		}
	);
};
module.exports.geocodeAddress = geocodeAddress;
