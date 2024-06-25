document.addEventListener('DOMContentLoaded', () => {
    function addRedirectButton(text, href) {
        const nav = document.querySelector('.redirect-nav ul');
        const newLi = document.createElement('li');
        newLi.className = 'redirect-button';
        const newA = document.createElement('a');
        newA.href = href;
        newA.textContent = text;
        newLi.appendChild(newA);
        nav.appendChild(newLi);
    }

    fetch('/api/isAdmin')
        .then(response => response.json())
        .then(data => {
            if (data.message === 'true') {
                addRedirectButton('Admin panel', '/admin');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});