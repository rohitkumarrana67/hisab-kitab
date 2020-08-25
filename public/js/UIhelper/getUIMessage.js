const getUIMessage = function(messages){
    
    if(messages[0] == "'mobile_number' must be a number"){
        return { messages : 'Invalid Mobile Number'}
    }
    else if(messages == "'password' length must be at least 7 characters long"){
        return { messages : 'Password too weak.. Please choose a password with atleast 7 Characters'}
    }
    else if(messages[0] == "'email' must be a valid email"){
        return { messages : 'Invalid Email'}
    }
    else if(messages[0].includes("is not allowed to be empty")){
        return { messages : 'Required Field cannot be Blank'}
    }
    else if(messages.includes("E11000 duplicate key error collection: khata_book.users index:")){
        return { messages : 'Email already in Use.. Please try with a different email id.!'}
    }
    else if(messages[0].includes("is required")){
        return { messages : 'Required Field cannot be Blank'}
    }
    else if(messages[0].includes('is not allowed to be empty') || messages.includes('is not allowed to be empty')){
        return {messages:'Required Field cannot be empty'}
    }
    else if(messages=="current password not matched!"){
        return {messages:'The password you entered was incorrect! '}
    }
    else if(messages=="'email' must be a valid email"){
        return {messages:"Inavalid Email"}
    }
    else if(messages =="unable to login" || messages=="'email' must be a valid email" || messages=="'password' length must be at least 7 characters long"){
        return {messages:"Invalid Username or Password"}
    }
    else if(messages == "'password' is not allowed to be empty"){
        return {messages:"Password cannot be blank"}
    }
    else if(messages == "'email' is not allowed to be empty"){
        return {messages:"Email cannot be blank"}
    }
    else if(messages.includes("E11000 duplicate key error collection: ")){
        return {messages:"Email ID already in use"}
    }
    else if(messages.includes("Cast to Number failed for value") || messages == "'mobile_number' must be a number"){
        return {messages:"Mobile number is not valid"}
    }
    else if(messages == "'email' is not allowed to be empty"){
        return {messages:"Email cannot be blank"}
    }
    else if(messages == 'User with the given mail id does not exists'){
        return {messages}
    }
    else{
        return { messages : 'Something went wrong.. Please try again..!'}
    }
}