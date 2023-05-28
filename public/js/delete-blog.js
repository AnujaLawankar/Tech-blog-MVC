async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/dashboard/delete/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            blog_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        alert("Blog is Deleted")
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }

}

document.querySelector('.delete-blog-btn').addEventListener('click', deleteFormHandler);