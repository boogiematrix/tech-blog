const postId = document.getElementById('post-id');

const editPost = async function (event) {
    event.preventDefault();

    const title = document.getElementById('post-title').value;
    const body = document.getElementById('post-body').value;

    await fetch(`/api/posts/${postId.value}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    document.location.replace('/dashboard');
};

const deletePost = async function () {
    await fetch(`/api/posts/${postId.value}`, {
        method: 'DELETE'
    });

    document.location.replace('/dashboard');
};

document
    .querySelector('#edit-post-form')
    .addEventListener('submit', editPost);
document
    .querySelector('#delete-btn')
    .addEventListener('click', deletePost);