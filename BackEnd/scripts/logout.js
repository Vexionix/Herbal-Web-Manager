document.getElementById('logout-link').addEventListener('click', function (event) {
    event.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        document.getElementById('logout-form').submit();
    }
});