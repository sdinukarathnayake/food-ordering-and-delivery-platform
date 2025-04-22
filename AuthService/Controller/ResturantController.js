const resturantModel = require('../Models/ResturantModel');
const UserModel = require('../Models/UserModel');
const bcryptjs = require('bcryptjs');
const axios = require('axios');

const registerResturant = async (req, res) => {
    try {
        const { name, location, paymentStatus, lat, lng, adminPassword,adminEmail,adminName,role,phone } = req.body;
        const resturantPhoto = req.files['resturantPhoto'] ? req.files['resturantPhoto'][0].filename : null;
        const adminPhoto = req.files['adminPhoto'] ? req.files['adminPhoto'][0].filename : null;

        console.log(req.body);
        console.log("all photos",req.files);

        if (!name || !location || !resturantPhoto || !lat || !lng || !paymentStatus ||
            !adminPassword||!adminEmail||!adminName||!role||!adminPhoto || !phone) {
            console.log("Provide all the required fields");
            return res.status(404).json({ message: "Provide all the required fields" });
        }

        const existingName = await resturantModel.findOne({ resturantName: name, resturantLocation: location });
        if (existingName) {
            console.log("Resturant already exists!");
            return res.status(409).json({ message: "Resturant already exists!" });
        }

        //saving resturant admin
        const encryptedPassword = await bcryptjs.hash(adminPassword,10);

        const newResturantAdmin = new UserModel({
            name:adminName,
            email:adminEmail,
            password:encryptedPassword,
            role,
            phone,
            photo:adminPhoto,
            resturantName:name
        })

        const savedResturantAdmin = await newResturantAdmin.save();

        //saving the resturant
        const newResturant = new resturantModel({
            resturantName: name,
            resturantLocation: location,
            resturantPhoto,
            paymentStatus,
            lat,
            lng,
            admin:savedResturantAdmin._id,
        });

        const registeredResturant = await newResturant.save();

        res.status(200).json({ message: "Resturant registered successfully", registeredResturant,savedResturantAdmin });
    } catch (err) {
        res.status(500).json({ message: "Resturant registration error", error: err.message });
        console.log(err);
    }
};

const approveResturant = async (req, res) => {
    try {
        const { resturantId, status } = req.body;

        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        console.log("resturant route hit");

        const updatedResturant = await resturantModel.findByIdAndUpdate(
            resturantId,
            { status },
            { new: true }
        ).populate('admin');
      
        if (!updatedResturant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        console.log("resturant updated");

         // Format phone
        let adminPhone = updatedResturant.admin.phone;
        if (adminPhone.startsWith("0")) {
            adminPhone = adminPhone.replace(/^0/, "+94");
        }
        
        await axios.post('http://admin-notification-service:7000/api/notifications/send-notifications', {
            email: {
                to: updatedResturant.admin.email,
                subject: `Your registration has been ${status}`,
                text: `Dear ${updatedResturant.admin.name},\n\nYour ${updatedResturant.resturantName} registration has been ${status} by the system admin.\n\nThank you!`
            },
            sms: {
                to: adminPhone,
                body: `Dear "${updatedResturant.admin.name}", your resturant have been ${status}.`
            }
        });

        console.log("resturant notification sent");
        
        res.status(200).json({
            message: `Restaurant ${status} successfully and email and sms sent`,
            updatedResturant
        });

    } catch (err) {
        res.status(500).json({ message: "Error updating restaurant status", error: err.message });
    }
};

const getPendingResturant = async(req,res)=>{
    try{
        const pendingRestaurants = await resturantModel.find({ status: "pending" }).populate('admin');

        console.log("pending resturants",pendingRestaurants);
        res.status(200).json({ pendingRestaurants });

    }catch(err){
        res.status(500).json({ message: "Error fetching pending restaurants", error: err.message });
    }

}

const getRejectedResturant = async(req,res)=>{

    try{
        const rejectedResturants = await resturantModel.find({status:"rejected"}).populate('admin');
        if(!rejectedResturants){
            return res.status(404).json({ message: "No rejected restaurants found" });
        }
        console.log("rejected resturants",rejectedResturants);

        res.status(200).json({message:"Rejected resturants",rejectedResturants});

    }catch(err){
        res.status(500).json({ message: "Error fetching rejected restaurants", error: err.message });   
    }

}

module.exports = { registerResturant, approveResturant,getPendingResturant,getRejectedResturant };

