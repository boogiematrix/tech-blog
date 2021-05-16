const newPost = async function (event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value;
    const body = document.querySelector('#post-body').value;

    await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            body,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    document.location.replace('/dashboard');
};

document
    .querySelector('#new-post-form')
    .addEventListener('submit', newPost);