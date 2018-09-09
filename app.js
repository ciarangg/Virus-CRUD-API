const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser')
const virusFamiliesRoutes = require('./routes/virusfamilies')
//const virusFamilies = require('./data/cohorts.js')

//configuration
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))

//routes
app.use('/virusfamilies', virusFamiliesRoutes)

app.get('/', (request, response, next) => {
    response.status(200).json({message: 'i succeeded'})
    console.log('ello')
})

app.listen(port, () => {
    console.log(`I'm listening on ${port}`)
})


module.exports = app;
