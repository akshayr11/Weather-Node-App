const request = require("request");
const yargs = require("yargs");
const geocode = require("./geoCode/geoCode");
const DarkSkyApi = "7c05eb91f3ec00d5f0ce27dc5837dc38";
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
		fetchWeather(res);
		console.log(JSON.stringify(res, undefined, 2));
	}
});

function fetchWeather(address) {
	const Latitude = address.Latitude;
	const Longitude = address.Longitude;
	request(
		{
			url: `https://api.darksky.net/forecast/${DarkSkyApi}/${Latitude},${Longitude}`,
			json: true
		},
		(error, res, body) => {
			if (!error && res.statusCode === 200) {
				console.log(body.currently.temperature);
			} else {
				console.log("Unable to fetch weather");
			}
		}
	);
}
