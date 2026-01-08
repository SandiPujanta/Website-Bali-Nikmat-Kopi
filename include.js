function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    elements.forEach(el => {
        const file = el.getAttribute('data-include') || el.getAttribute('src');
        if (file) {
            fetch(file)
                .then(response => {
                    if (response.ok) return response.text();
                    throw new Error('Page not found');
                })
                .then(data => {
                    el.innerHTML = data;
                    el.removeAttribute('data-include');
                    // Re-run includeHTML in case the new content also has data-include
                    includeHTML();
                })
                .catch(err => {
                    console.error('Error including file:', err);
                    el.innerHTML = "Content not found.";
                });
        }
    });
}

document.addEventListener('DOMContentLoaded', includeHTML);
