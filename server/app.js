const express = require('express')
const sequelize = require('./cfg/sequelize')
const fs = require('fs')
const bodyParser = require('body-parser')
const env = require('dotenv').config()
const models = require('./models')

const app = express()

//parser setup
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//routing setup
const routeList = fs.readdirSync('./routes')

for(const fileName of routeList){
    app.use(require(`./routes/${fileName}`))
}

//swagger setup
if(process.env.DEV){
    const swaggerJsdoc = require("swagger-jsdoc")
    const swaggerUi = require("swagger-ui-express")
    const swaggerOptions = require('./cfg/swagger')

    const specs = swaggerJsdoc(swaggerOptions)

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))
}

sequelize.sync()

app.listen(process.env.PORT)

console.log('App started on port:',  process.env.PORT)