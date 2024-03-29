const express = require("express");
const slack = require("./slack.js");
const sendMessageToSlack = require("./slack.js");
const router = express.Router();

//Could use database
//Dictionary of users dic[Number] = (first name, last name, address)
USERDIC = {}
//list of lat and lng for markers
MARKERDIC = {}

//post new user to dic
router.post("/", async (req,res)=>{
    const userInfo = req.body
    if (userInfo.phoneNumber in USERDIC) return res.sendStatus(200)
    let lat = userInfo.location.lat
    let lng = userInfo.location.long
    MARKERDIC[userInfo.phoneNumber] = {lat: lat ,lng: lng}
    //GET API KEY!
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=API_KEY')
    .then((response) => response.json())
    .then((json) =>{
        const address = json.plus_code.compound_code.split(" ").slice(1,4).join(" ")
        USERDIC[userInfo.phoneNumber] = {fname: userInfo.fname, lname: userInfo.lname, address: address}
        sendMessageToSlack(` Logged new user: (${userInfo.fname} ${userInfo.lname}: ${address}) `)
        return res.sendStatus(200)
    })
})

//get all the users and their locations
router.get("/", async (req,res)=>{
    res.send({MARKERDIC,USERDIC})
})
module.exports = router
