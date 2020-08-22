const User = require("../../db/models/users");
const Customer = require("../../db/models/customer");
const Transaction = require("../../db/models/transactions");
const { recordNotFoundError, unprocessableEntityError } = require("../../core/utility_functions");
var uuid = require('uuid-random');
const bcrypt = require("bcryptjs");
const mailgun = require("mailgun-js");
const jwt = require('jsonwebtoken')
const DOMAIN = process.env.MAIL_DOMAIN;
const mg = mailgun({apiKey: process.env.MAIL_API_KEY, domain: DOMAIN});


module.exports = UserDispatcher = function (req_data, user_info) {
    // console.log(req_data)
    this.req_data = req_data
    this.user_info = user_info
}

UserDispatcher.prototype.create = async function (req_data) {
    req_data.user_id = uuid();
    const user = new User(req_data);
    const user_data = await user.save();
    const token = await user.generateAuthToken();
    return { user, token };
}

UserDispatcher.prototype.login = async function (req_data) {
    const user = await User.findByCredentials(req_data.email, req_data.password);
    const token = await user.generateAuthToken();
    return { user, token };
}

UserDispatcher.prototype.update = async function () {
    const user_id = this.user_info.user_id
    const user = await User.findOneAndUpdate({ user_id }, { $set: this.req_data }, { new: true });
    return user;
}

UserDispatcher.prototype.updatePassword = async function () {
    const user_id = this.user_info.user_id
    const user = await User.findOne({ user_id });
    const isMatch = await bcrypt.compare(this.req_data.current_password, user.password);
    if (!isMatch) {
        throw unprocessableEntityError("current password not matched!");
    }
    user.password = this.req_data.new_password
    return await user.save();
}

UserDispatcher.prototype.getAvatar = async function () {
    const user_id = this.req_data.user_id;
    const user = await User.findOne({ user_id });
    if (!user) {
        throw recordNotFoundError("No such user")
    } else if (!user.avatar) {
        throw recordNotFoundError("avatar not found")
    }
    return user;
}

UserDispatcher.prototype.deleteUser = async function () {
    const id = this.req_data.params.user_id;
    if(id === this.user_info.user_id){
        await User.deleteMany({user_id : id});
        await Customer.deleteMany({user_id : id});
        await Transaction.deleteMany({user_id : id});
        return true;
    }
    throw unprocessableEntityError("Cannot delete records of any other user.");
}

UserDispatcher.prototype.forgotpassword = async function() {
    const email = this.req_data.email;
    const user = await User.findOne({email});
    if(!user){
        throw recordNotFoundError("User with the given mail id does not exists");
    }
    else{
            const user_id = user.user_id
            const token = jwt.sign({user_id },'Resetpassword',{ expiresIn : '120m'});
            // console.log(token)
            await user.updateOne({resetLink: token})
            const data = {
                from: 'noreply@hisabkitab.com',
                to: 'anuragsri453@gmail.com',
                subject: 'Account Activation Link',
                html: `
                    <h2>Click on the link to reset your password</h2>
                    <a href=http://localhost:3060/users/resetpassword/${token}>ResetLink</a>
                `
            };
            return mg.messages().send(data).then(data=>{
                console.log("Mail sent")
                return { type:'success', message:"An email with a link to reset your password has been sent to your email id." }
            }).catch((error)=>{
                return { type:'error', message:"Unable to send email"}
            })
        }
}

UserDispatcher.prototype.resetpassword = async function() {
    // console.log(this.req_data)
    const resetLink = this.req_data.resetLink
    const newpassword = this.req_data.newpassword
    if(resetLink){
        return jwt.verify(resetLink, 'Resetpassword', async function(error, response){
            if(error){
                console.log("Invalid token or token expired")
                return 
            }
            const user = await User.findOne({resetLink});
            if(user){
                user.password = newpassword;
                user.resetLink = '';
                user.token = '';
                const data = await user.save()
                return { type:"success", message:"Password reset successful"}
            }
            else{
                console.log("Error ")
                return{type:"error",message:"User with this token does not exist or Token Expired"}
            }
        })
    }
}
