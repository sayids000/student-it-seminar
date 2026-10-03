function isValidStudentNumber(value) {
if (typeof value !== "string") {
return false;
}
var pattern = /^\d{2}-\d{4}-\d{3}$/;
if (pattern.test(value.trim())) {
return true;
}
return false;
}

function isValidPassword(value) {
if (typeof value !== "string") {
return false;
}
if (value.length < 8) {
return false;
}
if (/\s/.test(value)) {
return false;
}
if (/[A-Z]/.test(value) === false) {
return false;
}
if (/[0-9]/.test(value) === false) {
return false;
}
if (/[@$!]/.test(value) === false) {
return false;
}
return true;
}

function checkEmailFormat(value) {
var pattern = /^\S+@\S+\.\S+$/;
return pattern.test(value.trim());
}

function checkMobileFormat(value) {
var text = value.trim();
var one = /^09\d{9}$/;
var two = /^\+639\d{9}$/;
return one.test(text) || two.test(text);
}

var app = {
grab: function (id) {
return document.getElementById(id);
},

say: function (fieldId, errorId, message) {
app.grab(errorId).textContent = message;
if (message === "") {
app.grab(fieldId).setAttribute("aria-invalid", "false");
return true;
}
app.grab(fieldId).setAttribute("aria-invalid", "true");
return false;
},

testName: function () {
var name = app.grab("fullName").value.trim();
if (name.length < 2) {
return app.say("fullName", "fullNameError", "Please type your full name (at least 2 letters).");
}
return app.say("fullName", "fullNameError", "");
},

testStudent: function () {
if (isValidStudentNumber(app.grab("studentNumber").value)) {
return app.say("studentNumber", "studentNumberError", "");
}
return app.say("studentNumber", "studentNumberError", "Enter a student number in the format 24-1234-123.");
},

testEmail: function () {
if (checkEmailFormat(app.grab("email").value)) {
return app.say("email", "emailError", "");
}
return app.say("email", "emailError", "Please enter a valid email.");
},

testMobile: function () {
if (checkMobileFormat(app.grab("mobileNumber").value)) {
return app.say("mobileNumber", "mobileNumberError", "");
}
return app.say("mobileNumber", "mobileNumberError", "Use 09xxxxxxxxx or +639xxxxxxxxx.");
},

testPass: function () {
if (isValidPassword(app.grab("password").value)) {
return app.say("password", "passwordError", "");
}
return app.say("password", "passwordError", "Password needs 8+ chars, uppercase, a number and @ $ or !.");
},

testConfirm: function () {
var pw = app.grab("password").value;
var cp = app.grab("confirmPassword").value;
if (cp !== "" && cp === pw) {
return app.say("confirmPassword", "confirmPasswordError", "");
}
return app.say("confirmPassword", "confirmPasswordError", "Passwords do not match.");
},

testCourse: function () {
var val = app.grab("course").value;
if (val === "BSIT" || val === "BSCS") {
return app.say("course", "courseError", "");
}
return app.say("course", "courseError", "Please pick a course.");
},

testTerms: function () {
if (app.grab("terms").checked) {
return app.say("terms", "termsError", "");
}
return app.say("terms", "termsError", "You need to agree to the terms.");
},

showSummary: function () {
app.grab("summaryName").textContent = app.grab("fullName").value.trim();
app.grab("summaryStudentNumber").textContent = app.grab("studentNumber").value.trim();
app.grab("summaryEmail").textContent = app.grab("email").value.trim();
app.grab("summaryMobileNumber").textContent = app.grab("mobileNumber").value.trim();
app.grab("summaryCourse").textContent = app.grab("course").value;
app.grab("registrationSummary").hidden = false;
app.grab("successMessage").textContent = "Registration details validated successfully!";
},

clearAll: function () {
var errors = ["fullNameError", "studentNumberError", "emailError", "mobileNumberError", "passwordError", "confirmPasswordError", "courseError", "termsError"];
for (var i = 0; i < errors.length; i++) {
app.grab(errors[i]).textContent = "";
}
var fields = ["fullName", "studentNumber", "email", "mobileNumber", "password", "confirmPassword", "course", "terms"];
for (var j = 0; j < fields.length; j++) {
app.grab(fields[j]).setAttribute("aria-invalid", "false");
}
var summary = ["summaryName", "summaryStudentNumber", "summaryEmail", "summaryMobileNumber", "summaryCourse"];
for (var k = 0; k < summary.length; k++) {
app.grab(summary[k]).textContent = "";
}
app.grab("passwordFeedback").textContent = "";
app.grab("successMessage").textContent = "";
app.grab("registrationSummary").hidden = true;
},

init: function () {
var form = app.grab("registrationForm");

form.onsubmit = function (e) {
e.preventDefault();
var tests = [app.testName(), app.testStudent(), app.testEmail(), app.testMobile(), app.testPass(), app.testConfirm(), app.testCourse(), app.testTerms()];
if (tests.indexOf(false) === -1) {
app.showSummary();
}
};

form.onreset = function () {
app.clearAll();
};

app.grab("password").oninput = function () {
var pw = app.grab("password").value;
if (pw === "") {
app.grab("passwordFeedback").textContent = "";
} else if (isValidPassword(pw)) {
app.grab("passwordFeedback").textContent = "Strong password.";
} else {
app.grab("passwordFeedback").textContent = "Needs 8+ chars, uppercase, number and @ $ or !.";
}
};

app.grab("fullName").onblur = app.testName;
app.grab("course").onchange = app.testCourse;
app.grab("terms").onchange = app.testTerms;

app.grab("studentNumber").oninput = function () {
if (app.grab("studentNumberError").textContent !== "") app.testStudent();
};
app.grab("email").oninput = function () {
if (app.grab("emailError").textContent !== "") app.testEmail();
};
app.grab("mobileNumber").oninput = function () {
if (app.grab("mobileNumberError").textContent !== "") app.testMobile();
};
app.grab("confirmPassword").oninput = function () {
if (app.grab("confirmPasswordError").textContent !== "") app.testConfirm();
};
}
};

if (typeof document !== "undefined") {
window.onload = function () {
app.init();
};
}

if (typeof module !== "undefined" && module.exports) {
module.exports = { isValidStudentNumber: isValidStudentNumber, isValidPassword: isValidPassword };
}
