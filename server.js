const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const request = require("request");

const BASE_URL = "https://coronavirus-tracker-api.herokuapp.com/v2";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/covid/all', (req, res) => {

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

app.get('/api/covid/country', (req, res) => {

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

// app.post('/api/world', (req, res) => {
//     console.log(req.body);
//     res.send(
//         `I received your POST request. This is what you sent me: ${req.body.post}`,
//     );
// });

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));