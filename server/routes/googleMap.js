const express = require("express");
const router = express.Router();



//Could use database
//Dictionary of users dic[Number] = (first name, last name, address)
USERDIC = {}
//list of lat and lng for markers
MARKERDIC = {}
router.post("/", async (req,res)=>{
    const userInfo = req.body
    if (userInfo.phoneNumber in USERDIC) return res.sendStatus(200)
    let lat = userInfo.location.lat
    let lng = userInfo.location.long
    MARKERDIC[userInfo.phoneNumber] = {lat: lat ,lng: lng}
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyBD0dirUoiHMG-LiLDqJ4-ZloDzV1DueKg')
    .then((response) => response.json())
    .then((json) => USERDIC[userInfo.phoneNumber] = {fname: userInfo.fname, lname: userInfo.lname, address: json.plus_code.compound_code.split(" ").slice(1,4).join(" ")})
    return res.sendStatus(200)
});
router.get("/", async (req,res)=>{
    res.send({MARKERDIC,USERDIC})
})
module.exports = router
