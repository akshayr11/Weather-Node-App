const request = require("request");
const APIKEY = "9d14b7a32a3d37f8330861ad86a5fb16";
const geoCodeAddress = address => {
	return new Promise((resolve, reject) => {
		const encodedAddress = encodeURIComponent(address);
		request(
			{
				url: `http://api.openweathermap.org/data/2.5/weather?q=${encodedAddress}&appid=${APIKEY}`,
				json: true
			},
			(err, res, body) => {
				if (err) {
					reject("Unable to connect to Open Weather Map servers");
				} else if (res.statusCode === 404) {
					reject(`Unable to find that address`);
				} else if (res.statusCode === 200) {
					const result = {
						lat: body.coord.lon,
						lng: body.coord.lat
					};
					resolve(result);
				}
			}
		);
	});
};
module.exports.geoCodeAddress = geoCodeAddress;
