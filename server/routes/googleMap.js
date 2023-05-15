const express = require("express");
const router = express.Router();



//Could use database
//Dictionary of users dic[Number] = (first name, last name,long,lat)
USERDIC = {}



router.post("/", async (req,res)=>{
    const userInfo = req.body
    if (userInfo.phoneNumber in USERDIC) return res.send(400)
    USERDIC[userInfo.phoneNumber] = [userInfo.fname, userInfo.lname,userInfo.location.long,userInfo.location.lat]
    return res.sendStatus(200)
});
module.exports = router
