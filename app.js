const request = require("request");
const yargs = require("yargs");
const geocode = require("./geoCode/geoCode");
const weather = require("./weather/weather");
const argv = yargs
	.options({
		a: {
			demand: true,
			alias: "address",
			description: "Address to fetch weather for",
			string: true
		}
	})
	.help()
	.alias("help", "h").argv;

geocode.geocodeAddress(argv.address, (err, res) => {
	if (err) {
		console.log(err);
	} else {
		weather.getWeather(res, (err, weatherResults) => {
			if (err) {
				console.log(err);
			} else {
				console.log(`Its currently ${weatherResults.temp}, but it feels like ${weatherResults.apprentTemp}`);
			}
		});
	}
});
