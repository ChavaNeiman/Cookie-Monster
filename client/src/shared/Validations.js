const isValidName = (name) => {
    //returns true if name is from 2 to 20 letters in the ABC alphabet.
    return /^([a-zA-Z\s.]{2,20})$/.test(name);
}

function isValidIsraeliID(id) {
    //returns true if id contains exactly 9 digits where the last digit is valid. 
    return /\d{9}/.test(id) && Array.from(id, Number).reduce((counter, digit, i) => {
        const distance = digit * ((i % 2) + 1);
        return counter + (distance > 9 ? distance - 9 : distance);
    }) % 10 === 0;
}

const isValidPhoneNumber = (phoneNumber) => {
    //returns true if phoneNumber has 7 to 10 digits.
    return /^[+]?[(]?[0-9]{0,3}[)]?[-.]?[0-9]{3}[-.]?[0-9]{4}$/.test(phoneNumber);
}

const isValidEmail = (email) => {
    //returns true if email is in the form of: exampleEmail@example.com, 
    //where the letters in between "@" and ".", 
    //and from "." to the end cant be longer than 20 letters.
    return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(email);
}

const isValidPassword = (password) => {
    //returns true if password contains at least 8 charchters 
    //including at least one digit, lowercase and uppercase letter.
    return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/.test(password);
}

const isValidCreditCard = (creditCard) => {
    //returns true if password is one of the following type:
    //Visa, MasterCard, American Express, Diners Club, Discover, and JCB.
    return /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/.test(creditCard);
}

const isValidHomeAddress = (address) => {
    return /[A-Za-z0-9'.\-\s,]/.test(address);
}

const isvalidCvv = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
}

const isvalidZipCode = (zipCode) => {
    return /^\d{5,9}$/.test(zipCode);
}

const validateExpiryDate = (date) => {
    if (/(0|1)[0-9]\/(20)[0-9]{2}/.test(date)) {
        let date_array = date.split('/');

        // Attention! Javascript consider months in the range 0 - 11
        let month = date_array[0] - 1;
        let year = date_array[1];

        // This instruction will create a date object
        let source_date = new Date();
        if (year >= source_date.getFullYear()) {
            if (month >= source_date.getMonth()) {
                return "";
            } else {
                return "invalid month."
            }
        } else {
            return "invalid year";
        }
    }
    else {
        return "invalid expiration date, format should be mm/yyyy";
    }
}

const isValidCity = (city) => {
    return /^[a-zA-Z\u0080-\u024F]+(?:([ \-']|(\. ))[a-zA-Z\u0080-\u024F]+)*$/.test(city);
}

export const isEmptyField = (value) => {
    return value === ""
}

const requiredMessage = "Required field";

const verifyName = (name) => {
    if (isEmptyField(name)) {
        return requiredMessage;
    }
    if (!isValidName(name)) {
        return "invalid name: name must contain until 20 letters";
    }
    return "";
}

const verifyId = (id) => {
    if (isEmptyField(id)) {
        return requiredMessage;
    }
    if (!isValidIsraeliID(id)) {
        return "invalid id";
    }
    return "";
}

const verifyPhoneNumber = (phoneNumber) => {
    if (isEmptyField(phoneNumber)) {
        return requiredMessage;
    }
    if (!isValidPhoneNumber(phoneNumber)) {
        return "invalid phone number";
    }
    return "";
}

const verifyEmail = (email) => {
    if (isEmptyField(email)) {
        return requiredMessage;
    }
    if (!isValidEmail(email)) {
        return "invalid email: email must be in the form of: exampleEmail@example.com";
    }
    return "";
}

const verifyPassword = (password) => {
    if (isEmptyField(password)) {
        return requiredMessage;
    }
    if (!isValidPassword(password)) {
        return "invalid password: password must contain at least 8 charchters including at least one digit, lowercase and uppercase letter";
    }
    return "";
}

const verifyConfirmatoinPassword = (password, confirmationPassword) => {
    if (isEmptyField(confirmationPassword)) {
        return requiredMessage;
    }
    if (!isValidPassword(confirmationPassword)) {
        return "invalid password: password must contain at least 8 charchters including at least one digit, lowercase and uppercase letter";
    }
    if (password !== confirmationPassword) {
        return "The passwords don't match."
    }
    return "";
}

const verifyCreditCard = (cc) => {
    if (isEmptyField(cc)) {
        return requiredMessage;
    }
    if (!isValidCreditCard(cc)) {
        return "invalid credit card number.";
    }
    return "";
}

const verifyCvv = (cvv) => {
    if (isEmptyField(cvv)) {
        return requiredMessage;
    }
    if (!isvalidCvv(cvv)) {
        return "invalid security number. it must be 3 or 4 digits";
    }
    return "";
}

const verifyZipCode = (zipCode) => {
    if (isEmptyField(zipCode)) {
        return requiredMessage;
    }
    if (!isvalidZipCode(zipCode)) {
        return "invalid zip code."
    }
    return "";
}

const verifyAddress = (address) => {
    if (isEmptyField(address)) {
        return requiredMessage;
    }
    if (!isValidHomeAddress(address)) {
        return "invalid address: please ommit invalid charachters such as @& etc.";
    }
    return "";
}

const verifyExpiryDate = (date) => {
    if (isEmptyField(date)) {
        return requiredMessage;
    }
    else {
        return validateExpiryDate(date);
    }
}

const verifyCity = (city) => {
    if (isEmptyField(city)) {
        return requiredMessage;
    }
    if (!isValidCity(city)) {
        return "invalid city.";
    }
    return "";
}

const verifyCountry = (country) => {
    if (isEmptyField(country)) {
        return requiredMessage;
    }
    return "";
}

export const validateField = (field) => {
    switch (field.name) {
        case "username":
            return verifyName(field.value);
        case "id":
            return verifyId(field.value);
        case "phoneNumber":
            return verifyPhoneNumber(field.value);
        case "email":
            return verifyEmail(field.value);
        case "password" || "confirmationPassword":
            return verifyPassword(field.value);
        case "cardNumber":
            return verifyCreditCard(field.value);
        case "shippingAddress" || "billingAddress":
            return verifyAddress(field.value);
        case "securityNumber":
            return verifyCvv(field.value);
        case "zipCode":
            return verifyZipCode(field.value);
        case "expirationDate":
            return verifyExpiryDate(field.value);
        case "city":
            return verifyCity(field.value);
        case "country":
            return verifyCountry(field.value);
        default: return "";
    }
}

export const validateForm = (form) => {
    let formErrors = {};
    formErrors.name = verifyName(form.name);
    if ("id" in form)
        formErrors.id = verifyId(form.id);
    formErrors.email = verifyEmail(form.email);
    formErrors.password = verifyPassword(form.password);
    if ("confirmPassword" in form)
        formErrors.confirmPassword = verifyConfirmatoinPassword(form.password, form.confirmPassword);
    return formErrors;
}

export const validateCheckoutForm = (form) => {
    let formErrors = {};
    formErrors.name = verifyName(form.name);
    formErrors.shippingAddress = verifyAddress(form.shippingAddress);
    formErrors.city = verifyCity(form.city);
    formErrors.country = verifyCountry(form.country);
    formErrors.phoneNumber = verifyPhoneNumber(form.phoneNumber);
    formErrors.cardNumber = verifyCreditCard(form.cardNumber);
    formErrors.expirationDate = verifyExpiryDate(form.expirationDate);
    formErrors.securityNumber = verifyCvv(form.securityNumber);
    formErrors.zipCode = verifyZipCode(form.zipCode);
    return formErrors;
}