/*Mobile nav */
function initNavigation() {
    var navToggle = document.getElementById("navToggle");
    var mainNav = document.getElementById("mainNav");
    var navOverlay = document.getElementById("navOverlay");

    if (!navToggle || !mainNav) {
        return;
    }

    function openNav() {
        mainNav.classList.add("open");
        navToggle.classList.add("active");
        if (navOverlay) {
            navOverlay.classList.add("active");
        }
        document.body.style.overflow = "hidden";
    }

    function closeNav() {
        mainNav.classList.remove("open");
        navToggle.classList.remove("active");
        if (navOverlay) {
            navOverlay.classList.remove("active");
        }
        document.body.style.overflow = "";
    }

    navToggle.addEventListener("click", function () {
        if (mainNav.classList.contains("open")) {
            closeNav();
        } else {
            openNav();
        }
    });

    if (navOverlay) {
        navOverlay.addEventListener("click", function () {
            closeNav();
        });
    }

    var navLinks = mainNav.querySelectorAll(".nav-link");
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", function () {
            closeNav();
        });
    }
}

/* Header Scroll Effect */
function initHeaderScroll() {
    var header = document.querySelector(".header");
    if (!header) {
        return;
    }

    function onScroll() {
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", onScroll);
}

/* Validations */
function initOrderForm() {
    var orderForm = document.getElementById("orderForm");
    if (!orderForm) {
        return;
    }

    var successAlert = document.getElementById("successAlert");
    var errorAlert = document.getElementById("errorAlert");

    function showError(fieldId, errorId) {
        var field = document.getElementById(fieldId);
        var errorMsg = document.getElementById(errorId);
        if (field) {
            field.classList.add("error");
        }
        if (errorMsg) {
            errorMsg.classList.add("visible");
        }
    }

    function hideError(fieldId, errorId) {
        var field = document.getElementById(fieldId);
        var errorMsg = document.getElementById(errorId);
        if (field) {
            field.classList.remove("error");
        }
        if (errorMsg) {
            errorMsg.classList.remove("visible");
        }
    }

    function clearAllErrors() {
        var errorMsgs = orderForm.querySelectorAll(".field-error");
        for (var i = 0; i < errorMsgs.length; i++) {
            errorMsgs[i].classList.remove("visible");
        }

        var errorFields = orderForm.querySelectorAll(".error");
        for (var j = 0; j < errorFields.length; j++) {
            errorFields[j].classList.remove("error");
        }

        if (successAlert) {
            successAlert.classList.remove("visible");
        }
        if (errorAlert) {
            errorAlert.classList.remove("visible");
        }
    }

    function validateNameNotEmpty(name) {
        if (name === "") {
            return false;
        }
        return true;
    }

    function validateNameLength(name) {
        if (name.length < 3) {
            return false;
        }
        return true;
    }

    function validateEmailNotEmpty(email) {
        if (email === "") {
            return false;
        }
        return true;
    }

    function validateEmailFormat(email) {
        if (email.indexOf("@") === -1) {
            return false;
        }
        if (email.indexOf(".") === -1) {
            return false;
        }
        return true;
    }

    function validateService(service) {
        if (service === "" || service === null) {
            return false;
        }
        return true;
    }

    function validatePayment() {
        var paymentOptions = document.querySelectorAll('input[name="payment"]');
        for (var i = 0; i < paymentOptions.length; i++) {
            if (paymentOptions[i].checked) {
                return true;
            }
        }
        return false;
    }

    function validateAddons() {
        var addonOptions = document.querySelectorAll('input[name="addons"]');
        for (var i = 0; i < addonOptions.length; i++) {
            if (addonOptions[i].checked) {
                return true;
            }
        }
        return false;
    }

    var nameInput = document.getElementById("fullName");
    if (nameInput) {
        nameInput.addEventListener("input", function () {
            var val = this.value.trim();
            if (validateNameNotEmpty(val) && validateNameLength(val)) {
                hideError("fullName", "nameError");
            }
        });
    }

    var emailInput = document.getElementById("emailAddress");
    if (emailInput) {
        emailInput.addEventListener("input", function () {
            var val = this.value.trim();
            if (validateEmailNotEmpty(val) && validateEmailFormat(val)) {
                hideError("emailAddress", "emailError");
            }
        });
    }

    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();
        clearAllErrors();

        var isValid = true;

        var nameValue = document.getElementById("fullName").value.trim();
        var emailValue = document.getElementById("emailAddress").value.trim();
        var serviceValue = document.getElementById("serviceSelect").value;

        if (!validateNameNotEmpty(nameValue)) {
            showError("fullName", "nameError");
            document.getElementById("nameError").textContent = "Full name is required.";
            isValid = false;
        } else if (!validateNameLength(nameValue)) {
            showError("fullName", "nameError");
            document.getElementById("nameError").textContent = "Name must be at least 3 characters.";
            isValid = false;
        }

        if (!validateEmailNotEmpty(emailValue)) {
            showError("emailAddress", "emailError");
            document.getElementById("emailError").textContent = "Email address is required.";
            isValid = false;
        } else if (!validateEmailFormat(emailValue)) {
            showError("emailAddress", "emailError");
            document.getElementById("emailError").textContent = 'Please enter a valid email (must contain "@" and ".").';
            isValid = false;
        }

        if (!validateService(serviceValue)) {
            showError("serviceSelect", "serviceError");
            document.getElementById("serviceError").textContent = "Please select a service option.";
            isValid = false;
        }

        if (!validatePayment()) {
            var paymentError = document.getElementById("paymentError");
            if (paymentError) {
                paymentError.classList.add("visible");
            }
            isValid = false;
        }

        if (!validateAddons()) {
            var addonError = document.getElementById("addonError");
            if (addonError) {
                addonError.classList.add("visible");
            }
            isValid = false;
        }

        if (isValid) {
            if (successAlert) {
                successAlert.classList.add("visible");
            }
            orderForm.scrollIntoView({ behavior: "smooth", block: "start" });
            setTimeout(function () {
                orderForm.reset();
            }, 800);
        } else {
            if (errorAlert) {
                errorAlert.classList.add("visible");
            }
  
            var firstError = orderForm.querySelector(".field-error.visible");
            if (firstError) {
                firstError.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initNavigation();
    initHeaderScroll();
    initOrderForm();
    initFadeIn();
    initCounters();
});