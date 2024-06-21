function toggleCollapsibleSection(section, content) {
    content.style.height = '0px';
    content.style.overflow = 'hidden';
    content.style.transition = 'height 0.3s ease';
    
    section.addEventListener('click', function () {
        if (content.style.height === '0px') {
            content.style.height = content.scrollHeight + 'px';
        } else {
            content.style.height = '0px';
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const section1 = document.getElementById('collapsible-section');
    const content1 = document.querySelector('#collapsible-section .content');
    const section2 = document.getElementById('collapsible-section2');
    const content2 = document.querySelector('#collapsible-section2 .content');
    const section3 = document.getElementById('collapsible-section3');
    const content3 = document.querySelector('#collapsible-section3 .content');

    toggleCollapsibleSection(section1, content1);
    toggleCollapsibleSection(section2, content2);
    toggleCollapsibleSection(section3, content3);
});

