// const newFormHandler = async (event) => {
//     event.preventDefault();

//     const name = document.querySelector('#blog-name').value.trim();

//     const description = document.querySelector('#blog-desc').value.trim();

//     if (name && description) {
//         const response = await fetch(`/api/blogs`, {
//             method: 'POST',
//             body: JSON.stringify({ name, description }),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (response.ok) {
//             document.location.replace('/profile');
//         } else {
//             alert('Failed to create blog');
//         }
//     }
// };

// const delButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//         const id = event.target.getAttribute('data-id');

//         const response = await fetch(`/api/blogs/${id}`, {
//             method: 'DELETE',
//         });

//         if (response.ok) {
//             document.location.replace('/profile');
//         } else {
//             alert('Failed to delete blog');
//         }
//     }
// };

// document
//     .querySelector('.new-blog-form')
//     .addEventListener('submit', newFormHandler);

// document
//     .querySelector('.blog-list')
//     .addEventListener('click', delButtonHandler);

async function signupFormHandler(event) {
    event.preventDefault();


    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('success');


            document.location.replace('/login');

        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);