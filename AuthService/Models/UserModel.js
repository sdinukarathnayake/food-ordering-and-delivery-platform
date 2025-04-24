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
    // updated
    status: {
        type: String,
        default: function() {
            if (this.role === "DeliveryPerson") return "pending";
            if (this.role === "Customer") return "approved";
            return undefined; 
        },
        enum: ["pending", "approved", "rejected"]
    }
})

module.exports = mongoose.model("UserModel", UserModel);