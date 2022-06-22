const inputList = document.querySelectorAll("input");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const passwordInput = document.querySelector("#password");
const cfPasswordInput = document.querySelector("#cf-password");

const invalidSpans = Array.from(document.querySelectorAll(".invalid"));

function validateName() {
    if(nameInput.value.trim()) {
        nameInput.parentElement.classList.add("valid");
        nameInput.parentElement.classList.remove("invalid-field");
        return true;
    } else {
        nameInput.parentElement.classList.remove("valid");
        return false;
    }
};

function validateEmail() {
    if(emailInput.value) {
        let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(pattern.test(emailInput.value)) {
            emailInput.parentElement.classList.remove("invalid-field");
            emailInput.parentElement.classList.add("valid");
            return true;
        }
        else {
            emailInput.parentElement.classList.remove("valid");
            return false;
        }
    } else {
        emailInput.parentElement.classList.remove("valid");
        return false;
    }
};

function validatePhone() {
    if(phoneInput.value) {
        let pattern = /\([0-9]{3}\)\s?[0-9]{8}$/;
        if(pattern.test(phoneInput.value)) {
            phoneInput.parentElement.classList.remove("invalid-field");
            phoneInput.parentElement.classList.add("valid");
            return true;
        } else {
            phoneInput.parentElement.classList.remove("valid");
            return false;
        }
    } else {
        phoneInput.parentElement.classList.remove("valid");
        return false;
    }
};

function validatePassword() {
    if(passwordInput.value !== cfPasswordInput.value)
        cfPasswordInput.parentElement.classList.remove("valid");

    if(passwordInput.value.trim().length >= 6 && !passwordInput.value.includes(" ")) {
        passwordInput.parentElement.classList.remove("invalid-field");
        passwordInput.parentElement.classList.add("valid");
        return true;
    } else {
        passwordInput.parentElement.classList.remove("valid");
        return false;
    }
    
};

function confirmPassword() {
    if(cfPasswordInput.value.trim().length >= 6 && cfPasswordInput.value === passwordInput.value && !cfPasswordInput.value.includes(" ")) {
        cfPasswordInput.parentElement.classList.remove("invalid-field");
        cfPasswordInput.parentElement.classList.add("valid");
        return true;
    } else {
        cfPasswordInput.parentElement.classList.remove("valid");
        return false;
    }
};

function removeAdd(input) {
    input.parentElement.classList.remove("valid");
    input.parentElement.classList.add("invalid-field");
    input.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.style.opacity = "1";
    setTimeout(() => {
        input.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.style.opacity = "0";
    }, 1500);
}

function showHide() {
    const eye = document.querySelector(".fa-eye");
    const eyeSlash = document.querySelector(".fa-eye-slash");

    if(eye.classList.contains("show")) {
        eye.classList.remove("show");
        eye.classList.add("hide");
        eyeSlash.classList.remove("hide");
        eyeSlash.classList.add("show");
        passwordInput.type = "text";
        cfPasswordInput.type = "text";
    } else {
        eye.classList.remove("hide");
        eye.classList.add("show");
        eyeSlash.classList.remove("show");
        eyeSlash.classList.add("hide");
        passwordInput.type = "password";
        cfPasswordInput.type = "password";
    }
}


function signUp() {
    for(let i = 0; i < inputList.length; i++) {
        const req = document.getElementById(`${i + 1}`);
        if(!inputList[i].value)
            req.style.display = "block";
        else 
            req.style.display = "none";
    }
    if(!validateName()) {
        nameInput.parentElement.classList.remove("valid");
        nameInput.parentElement.classList.add("invalid-field");
    } else if(!validateEmail())
                removeAdd(emailInput);
            else if(!validatePhone()) 
                    removeAdd(phoneInput);
                else if(!validatePassword())
                    removeAdd(passwordInput);
                    else if(!confirmPassword())
                            removeAdd(cfPasswordInput);
                        else {
                            document.querySelector(".container").innerHTML = `<div class="congra">
                                                                            <i class="fas fa-check"></i>
                                                                            <span>SUCCESS</span>
                                                                            <p>Congratulations, your account has been successfully created.</p>
                                                                        </div>`;
                            document.querySelector(".container").style.opacity = "0";
                            document.querySelector(".container").style.transform = "scale(0)";
                            setTimeout(() => {
                                document.querySelector(".container").style.opacity = "1";
                                document.querySelector(".container").style.transform = "scale(1.1)";
                            }, 1);
                    }
}
setTimeout