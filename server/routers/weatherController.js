const axios = require("axios");
require('dotenv').config();

module.exports = {
  getWeather: (req, res) => {
    const userIpAddress = req.clientIp;
    console.log('user ip addy', userIpAddress);

    axios.get(`http://ip-api.com/json/${userIpAddress}?fields=city`)
      .then((ipResponse) => {
        console.log('ip api response', ipResponse.data);

        const userCity = ipResponse.data.city;
        console.log('user city', userCity);

        const apiKey = process.env.VISUAL_CROSSING_API_KEY;
        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userCity}/today?unitGroup=metric&contentType=json&key=${apiKey}`;
        console.log('weather api url', apiUrl);

        return axios.get(apiUrl);
      })
      .then((weatherResponse) => {
        console.log('weather api response', weatherResponse.data)
        res.json(weatherResponse.data);
      })
      .catch((err) => {
        console.error("Could not fetch weather data", err);
        res.sendStatus(500);
      });
  }
};