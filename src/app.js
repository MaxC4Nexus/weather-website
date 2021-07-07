const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../templates/views");
const partialsDirectoryPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set('views', viewsDirectoryPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsDirectoryPath);

// Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather app",
        name: "Max",
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About page",
        name: "Max",
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help page",
        helpInfo: "Helpful Text",
        name: "Max",
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "No address has been provided",
        });
    }

    geocode(req.query.address, (error, {long, lat, location} = {}) => {
        if(error) {
            return res.send({ error });
        }
    
        forecast(long, lat, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
    
            console.log(location);
            console.log(forecastData);

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            });
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term.",
        });
    }

    console.log(req.query.search);
    res.send({
        products: [],
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        info: "Help article not found!",
        name: "Max",
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        info: "Page not found!",
        name: "Max",
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});