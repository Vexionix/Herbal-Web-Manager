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
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        event.preventDefault();
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
        event.preventDefault();
        errorMessage.textContent = "The password is too weak!";
        await new Promise(resolve => setTimeout(resolve, 1000));
        errorMessage.textContent = "";
        return;
    }
    fetch('/api/user')
        .then(response => response.json())
        .then(data => {
            const plantContainer = document.getElementById('plant-container');
            data.forEach(plant => {
                const plantEntry = createPlantEntry(plant);
                plantContainer.appendChild(plantEntry);
            });
        })
        .catch(error => console.error('Error fetching plant data:', error));
});
