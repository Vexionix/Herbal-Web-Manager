document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const resetButton = document.getElementById("reset-button");

    searchButton.addEventListener("click", () => {
        const criteria = ["name", "plant-family", "habitat", "color"];
        let selectedOptions = {};

        const searchBar = document.querySelector(".search-bar-container input[type='text']");
        selectedOptions.searchQuery = searchBar.value;

        criteria.forEach(criterion => {
            const selected = document.querySelector(`input[name="${criterion}"]:checked`);
            if (selected) {
                selectedOptions[criterion] = selected.value;
            }
        });

        console.log("Selected Options:", selectedOptions);

        // to do post req to the server with the body of selected options
    });

    resetButton.addEventListener("click", () => {
        const radioButtons = document.querySelectorAll("input[type=radio]");
        radioButtons.forEach(radio => {
            radio.checked = false;
        });

        const searchBar = document.querySelector(".search-bar-container input[type='text']");
        searchBar.value = '';
    });
});