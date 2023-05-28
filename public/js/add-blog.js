

async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const description = document.querySelector('#description').value.trim();

    if (title && description) {
        const response = await fetch(`/api/blogs`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                description
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {

            document.location.replace('/dashboard');
        } else {
            alert('Falied to create');
        }
    }
};

document.querySelector('#new-blog-form').addEventListener('submit', newFormHandler);