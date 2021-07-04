const express = require('express')
require('./db/mongoose')
const app = express()
const port = process.env.PORT || 3000
const UserRouter = require('./routers/user')
const cors = require('cors');

app.use(cors())
app.use(express.json())
app.use(UserRouter)

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})
