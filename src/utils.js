var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
var phoneRegex = /^\d{9}$/;

const isEmailValid = function(email) {
    if (!email) return false;
    if(email.length>254) return false;
    if(!emailRegex.test(email)) return false;

    var parts = email.split("@");
    if(parts[0].length>64) return false;

    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>63; }))
        return false;

    return true;
}

const isPhoneValid = function(phone) {
    if(!phoneRegex.test(phone)) return false;
    
    return true;
}

module.exports = {
    isEmailValid,
    isPhoneValid
}