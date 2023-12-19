document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.querySelector('.form');

    registrationForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(registrationForm);
        const response = await fetch('http://localhost:3001/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });

        const data = await response.json();
        if (response.ok) {
            // Registration successful
            console.log('Registration successful:', data);
            // Redirect to login page or show a success message
        } else {
            // Registration failed
            console.error('Registration failed:', data.message);
            // Display an error message to the user
        }
    });
});
