const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const registerForm = document.getElementById("register-form");
const strengthMeter = document.getElementById("strengthMeter");
const strengthText = document.getElementById("strengthText");
const matchingCriteria = document.getElementById("matchingCriteria");
const criteriaMessages = document.getElementById("criteriaMessages");
const errorMessage = document.getElementById("errorMessage");

const strengthCriteria = [
    { regex: /.{8,}/, message: "At least 8 characters" },
    { regex: /[A-Z]/, message: "At least one uppercase letter" },
    { regex: /[a-z]/, message: "At least one lowercase letter" },
    { regex: /[0-9]/, message: "At least one number" },
    { regex: /[^A-Za-z0-9]/, message: "At least one special character" }
];

let passwordStrength = 0;

passwordInput.addEventListener("input", () => {

    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    passwordStrength = 0;

    let criteriaMessagesContent = "";
    strengthCriteria.forEach((criterion) => {
        if (criterion.regex.test(password)) {
            passwordStrength++;
            criteriaMessagesContent += `<p style="color: green;">✔ ${criterion.message}</p>`;
        } else {
            criteriaMessagesContent += `<p style="color: red;">✖ ${criterion.message}</p>`;
        }
    });

    criteriaMessages.innerHTML = criteriaMessagesContent;

    let passwordMatch = "";

    if (password !== confirmPassword) {
        passwordMatch += `<p style="color: red;">✖ Passwords should match!</p>`;
    } else {
        passwordMatch += `<p style="color: green;">✔ Passwords match!</p>`;
    }

    matchingCriteria.innerHTML = passwordMatch;

    let strengthMessage = "";
    let strengthColor = "";
    let meterWidth = "";
    switch (passwordStrength) {
        case 0:
        case 1:
            strengthMessage = "Weak";
            strengthColor = "#ff4d4d"; // red
            meterWidth = "33%";
            break;
        case 2:
        case 3:
            strengthMessage = "Medium";
            strengthColor = "#ffcc00"; // yellow
            meterWidth = "66%";
            break;
        case 4:
        case 5:
            strengthMessage = "Strong";
            strengthColor = "#28a745"; // green
            meterWidth = "100%";
            break;
    }

    strengthText.textContent = strengthMessage;
    strengthText.style.color = strengthColor;
    strengthMeter.querySelector("span").style.width = meterWidth;
    strengthMeter.querySelector("span").style.backgroundColor = strengthColor;
});

confirmPasswordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    let passwordMatch = "";

    if (password !== confirmPassword) {
        passwordMatch += `<p style="color: red;">✖ Passwords should match!</p>`;
    } else {
        passwordMatch += `<p style="color: green;">✔ Passwords match!</p>`;
    }

    matchingCriteria.innerHTML = passwordMatch;
});


registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match!";
        await new Promise(resolve => setTimeout(resolve, 1000));
        errorMessage.textContent = "";
        return;
    }

    let criteriaMet = 0;
    strengthCriteria.forEach((criterion) => {
        if (criterion.regex.test(password)) {
            criteriaMet++;
        }
    });

    if (criteriaMet < 5) {
        errorMessage.textContent = "The password is too weak!";
        await new Promise(resolve => setTimeout(resolve, 1000));
        errorMessage.textContent = "";
        return;
    }

    const userData = {
        username: document.getElementById('username').value,
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        password: password,
        email: document.getElementById('email').value,
    };

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            window.location.href = '/login';
        } else {
            const errorText = await response.text();
            errorMessage.textContent = errorText;
            await new Promise(resolve => setTimeout(resolve, 3000));
            errorMessage.textContent = "";
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = "An unknown error occurred.";
        await new Promise(resolve => setTimeout(resolve, 3000));
        errorMessage.textContent = "";
    }
});