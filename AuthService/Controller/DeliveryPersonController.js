const userModel = require('../Models/UserModel');
const bcryptjs = require('bcryptjs');
const axios = require('axios');

const registerDeliveryPerson = async (req, res) => {
    try {

        const{ name, email, password, phone, role } = req.body;
        const diliveryPhoto = req.files['diliveryPhoto'] ? req.files['diliveryPhoto'][0].filename : null;

        console.log("request body",req.body);

        if(!name || !email || !password || !phone || !role || !diliveryPhoto) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if(role !== "DeliveryPerson"){
            return res.status(400).json({message:"Invalid role"});
        }

        const exixtingUser = await userModel.findOne({name});
        if(exixtingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const hashPassword = await bcryptjs.hash(password, 10);

        const newDeliveryPerson  = new userModel({
            name,
            email,
            password:hashPassword,
            phone,
            role,
            photo:diliveryPhoto
        });

        await newDeliveryPerson.save();

        res.status(201).json({message:"Delivery person registered successfully", newDeliveryPerson});

     }catch(err){
        console.error("Error in registerDeliveryPerson:", err);
        res.status(500).json({ message: "Internal server error" });
     }

}

const getPendingDeliveryPerson = async(req,res)=>{

    try{
        const pendingDeliveryPerson  = await userModel.find({status:"pending", role:"DeliveryPerson"});
        if(!pendingDeliveryPerson){
            return res.status(404).json({message:"No pending delivery person found"});
        }
        res.status(200).json({pendingDeliveryPerson});
    }catch(err){
        console.error("Error fetching pending delivery persons:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

const approveDeliveryPerson = async(req,res)=>{ 

    try {
        const { deliveryPersonId, status } = req.body;

        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const updatedDeliveryPerson = await userModel.findByIdAndUpdate(
            deliveryPersonId,
            { status },
            { new: true }
        );

        if (!updatedDeliveryPerson) {
            return res.status(404).json({ message: "Delivery person not found" });
        }

        // Format phone
        let deliveryPersonPhone = updatedDeliveryPerson.phone;
        if (deliveryPersonPhone.startsWith("0")) {
            deliveryPersonPhone = deliveryPersonPhone.replace(/^0/, "+94");
        }

        await axios.post('http://admin-notification-service:7000/api/notifications/send-notifications', {
            email: {
                to: updatedDeliveryPerson.email,
                subject: `Your registration has been ${status}`,
                text: `Dear ${updatedDeliveryPerson.name},\n\nYour registration has been ${status} by the system admin.\n\nThank you!`
            },
            sms: {
                to: deliveryPersonPhone,
                text: `Dear "${updatedDeliveryPerson.name}", you have been ${status}.`
            }
        });

        res.status(200).json({
            message: `Delivery person ${status} successfully. Email and SMS sent.`,
            updatedDeliveryPerson
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
  }

module.exports = {registerDeliveryPerson,getPendingDeliveryPerson,approveDeliveryPerson}