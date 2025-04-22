const mongoose = require('mongoose')

const UserModel = mongoose.Schema({

    name: { 
        type: String 
    },

    email: { 
        type: String 
    },

    password: { 
        type: String 
    },

    role: {
        type: String,
        enum: ["SystemAdmin","Admin", "ResturantAdmin", "DeliveryPerson", "Customer"],
        default: "Customer"
    },
    
    photo: {
        type: String
    },

    phone:{
        type:String,
        required:function(){
            return this.role ==="DeliveryPerson" || this.role ==="ResturantAdmin"
        }
    },

    //resturntAdmin only

    resturantName:{type:String,
        required:function(){
            return this.role ==="ResturantAdmin"
        }
    },

    //delivery person only
    status:{
        type:String,
        default:function(){
            return this.role ==="DeliveryPerson"
        },
        enum:["pending","approved","rejected"],
        default:"pending"
    }
})

module.exports = mongoose.model("UserModel", UserModel);