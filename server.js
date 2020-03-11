require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

const disclaimersRouter = require('./routes/disclaimers')
const vehiclesRouter = require('./routes/vehicles')
const paymentsRouter = require('./routes/payments')
const leaseAgreementsRouter = require('./routes/leaseAgreements')

app.use('/disclaimers', disclaimersRouter)
app.use('/vehicles', vehiclesRouter)
app.use('/payments', paymentsRouter)
app.use('/leaseAgreements', leaseAgreementsRouter)


app.listen(3000, () => console.log('server started'))