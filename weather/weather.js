const request = require("request");
const DarkSkyApi = "7c05eb91f3ec00d5f0ce27dc5837dc38";

const getWeather = address => {
	return new Promise((resolve, reject) => {
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
					resolve(weather);
				} else {
					reject("Unable to fetch weather");
				}
			}
		);
	});
};

module.exports.getWeather = getWeather;
