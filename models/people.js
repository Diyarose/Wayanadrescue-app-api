const mongoose=require("mongoose")
const peopleSchema=mongoose.Schema(
    {
        fname:String,
        phoneno:String,
        village:String,
        place:String,
        pincode:String,
        houseno:String,
        missingdate:String,
        adharno:String,
        gender:String,
        age:String,
    }
)
const peopleModel=mongoose.model("peoples",peopleSchema)
module.exports=peopleModel