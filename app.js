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

geocode
	.geoCodeAddress(argv.address)
	.then(address => {
		console.log(address);
		return weather.getWeather(address);
	})
	.then(weatherResults => {
		console.log(`Its currently ${weatherResults.temp}, but it feels like ${weatherResults.apprentTemp}`);
	})
	.catch(e => {
		console.log(e);
	});
