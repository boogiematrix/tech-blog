const comment = async function (event) {
    event.preventDefault();

    const postId = document.getElementById('post-id').value;
    const body = document.getElementById('content-id').value;

    if (body) {
        await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                body
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        document.location.reload();
    }
};

document
    .querySelector('#new-comment')
    .addEventListener('submit', comment);