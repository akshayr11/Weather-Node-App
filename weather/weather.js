const request = require("request");
const DarkSkyApi = "7c05eb91f3ec00d5f0ce27dc5837dc38";

const getWeather = (address, callback) => {
	request(
		{
			url: `https://api.darksky.net/forecast/${DarkSkyApi}/${address.lat},${address.lng}`,
			json: true
		},
		(error, res, body) => {
			if (!error && res.statusCode === 200) {
				const weather = {
					temp: body.currently.temperature,
					apprentTemp: body.currently.apparentTemperature
				};
				callback(undefined, weather);
			} else {
				callback("Unable to fetch weather");
			}
		}
	);
};

module.exports.getWeather = getWeather;
