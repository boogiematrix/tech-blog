const signup = async function (event) {
    event.preventDefault();

    const username = document.querySelector('#name-signup');
    const password = document.querySelector('#password-signup');
    const email = document.querySelector('#email-signup')

    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to sign up');
    }
};

document
    .querySelector('#signup-form')
    .addEventListener('submit', signup);