const express = require('express')
//const bcrypt =  require('bcryptjs')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

router.get('/test',(req,res) => {
    res.send('From a new file')
})

router.post('/users',async (req, res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        
        res.status(201).send({user, token})
        //res.send(user)
    }catch(e){
        if(e.keyPattern.email){
            res.status(400).send({"message":"Email Already Exist"})
        }else{
            res.status(400).send(e)
        }
    }
    // user.save().then(()=>{
    //     res.send(user)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    // })
})

router.post('/login',async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch(e){
        res.status(404).send(e)
        console.log(e)
    }
    res.send('sss')
})

router.post('/users/logout',auth, async (req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token
        })

        await req.user.save()
        res.send()
    }catch(e){
        console.log(e);
        res.status(500).send()
    }
})

router.post('/users/logoutAll',auth, async (req, res)=>{
    try{
        req.user.tokens = []

        await req.user.save()
        res.send()
    }catch(e){
        console.log(e);
        res.status(500).send()
    }
})
router.get('/users/chart',auth, async (req, res)=>{
    try{
        res.send([{
            "country": "Lithuania",
            "litres": 501.9,
            "food" : 600
          }, {
            "country": "Czech Republic",
            "litres": 301.9,
            "food" : 500
          }, {
            "country": "Ireland",
            "litres": 201.1,
            "food" : 300
          }, {
            "country": "Germany",
            "litres": 165.8,
            "food" : 200
          }, {
            "country": "Australia",
            "litres": 139.9,
            "food" : 200
          }, {
            "country": "Austria",
            "litres": 128.3,
            "food" : 400
          }, {
            "country": "UK",
            "litres": 99,
            "food" : 200
          }, {
            "country": "Belgium",
            "litres": 60,
            "food" : 150
          }, {
            "country": "The Netherlands",
            "litres": 50,
            "food" : 100
          }])
    }catch(e){
        console.log(e);
        res.status(500).send()
    }
})




module.exports = router