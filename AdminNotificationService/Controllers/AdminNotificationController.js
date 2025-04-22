
const {sendEmail} = require('../utils/Emailservice');
const {sendSms} = require('../utils/SmsService');

const sendNotifications = async(req,res)=>{

    try{

        const{email,sms} = req.body;

        if(email){
            await sendEmail(email.to, email.subject, email.text);
            console.log("Email sent successfully");

        }
        if(sms){
            await sendSms(sms.to, sms.body);
            console.log("SMS sent successfully");

        }
    }catch(err){
        console.error("Error in sendNotifications:", err.message);
        return res.status(500).json({message: "Internal Server Error"});
    }

}

module.exports = {sendNotifications};