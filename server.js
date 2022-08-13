const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const PORT = process.env.PORT

const register = require('./controllers/register')
const signin = require('./controllers/signIn')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'Rex',
      password : '',
      database : 'track-face'
    }
  });


const app = express()

app.use(bodyParser.json())
app.use(cors())



app.get('/', (req, res)=>{res.send('GET is operational')})
app.post('/register', register.handleRegister(db,bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.post('/signin', signin.handleSignin(db, bcrypt))
app.put('/image', image.handleImage(db))
app.post('/imageurl', (req,res)=>image.handleAPICall(req,res))

app.listen(PORT || 3000, ()=>{
    console.log(`Running on PORT ${PORT}`)
})

