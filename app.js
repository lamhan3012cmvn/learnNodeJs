//import file or library
const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const mongoClient = require('mongoose')

// setup connect mongodb by mongoose
mongoClient.connect('mongodb://localhost/nodejsapistarter', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('✅ Connected database from mongodb.'))
    .catch((error) => console.error(`❌ Connect database is failed with error which is ${error}`))

// crete express app
const app = express()

//import router from folder route
const deckRoute = require('./routes/deck')
const userRoute = require('./routes/user')
const todoRoute = require('./routes/todo')

// Middlewares
// Midderwares thirt party
app.use(logger('dev'))
app.use(bodyParser.json())

// Routes
// Middlewares router
app.use('/decks', deckRoute)
app.use('/users', userRoute)
app.use('/todo', todoRoute)

// Routes
// cu phap don gian viet 1 api
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Server is OK!'
    })
})

app.get('/test', (req, res, next) => {
    return res.status(200).json({
        message: 'Server is OK!'
    })
})

//Midderwares error
// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    // response to client
    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})

// Start the server
const port = app.get('port') || 3000
//app listen port and output message to console
app.listen(port, () => console.log(`Server is listening on port ${port}`))