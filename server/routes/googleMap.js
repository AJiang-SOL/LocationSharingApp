const express = require("express");
const router = express.Router();



//Could use database
//Dictionary of users dic[Number] = (first name, last name)
USERDIC = {}



router.post("/", async (req,res)=>{
    const userInfo = req.body
    console.log(userInfo)
    USERDIC[userInfo.phoneNumber] = [userInfo.fname, userInfo.lname]
    console.log(USERDIC)
});

module.exports = router
