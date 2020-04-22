const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const request = require("request");
const serverless = require("serverless-http");
const BASE_URL = "https://coronavirus-tracker-api.herokuapp.com/v2";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let BASE_API = '/.netlify/functions/server/';
// if(process.env.NODE_ENV !== "development") {  
//     BASE_API = '/.netlify/functions/server/';
// }

app.get(`${BASE_API}api/covid/all`, (req, res) => {

    request(
        `${BASE_URL}/locations`,
        (error, response, body) => {

            const data = JSON.parse(body);
            if(!error) {

                const countries = {};

                data.locations.forEach(location => {
                    const code = location.country_code;

                    if(countries[code]) {
                        countries[code].latest.confirmed += location.latest.confirmed;
                        countries[code].latest.deaths += location.latest.deaths;
                        countries[code].latest.recovered += location.latest.recovered;

                    } else {
                        countries[code] = location;
                    }
                })
        
                const sortedLocations = Object
                    .values(countries)
                    .sort((a, b) => {
                        const aConfirmed = a.latest.confirmed;
                        const bConfirmed = b.latest.confirmed
                        if (bConfirmed > aConfirmed) return 1;
                        if (aConfirmed > bConfirmed) return -1;
                    
                        return 0;
                    })
                res.send({
                    data: sortedLocations
                })
            } else {
                res.status(response.statusCode).send({
                    data: response,
                    message: 'Could not find data'
                });
            }
        }
    );
});

app.get(`${BASE_API}api/covid/country`, (req, res) => {

    request(
        `${BASE_URL}/locations?country_code=${req.query.code.toUpperCase()}&timelines=1`,
        (error, response, body) => {

            const data = JSON.parse(body);
            if(!error) {
                res.send({
                    data: data.locations
                })
            } else {
                res.status(response.statusCode).send({
                    data: response,
                    message: 'Could not find data'
                });
            }
        }
    );
});

module.exports = app;
module.exports.handler = serverless(app);