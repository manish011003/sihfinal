document.addEventListener('DOMContentLoaded', function () {
    // Fetch user profile data (replace with your actual API endpoint)
    fetch('/api/user/profile')
        .then(response => response.json())
        .then(user => {
            // Update profile information in the HTML
            document.getElementById('profile-image').src = user.profileImage;
            document.getElementById('profile-name').textContent = user.name;
            document.getElementById('profile-email').textContent = user.email;
            document.getElementById('profile-city').textContent = user.city;
            document.getElementById('credit-points-value').textContent = user.creditPoints;
        })
        .catch(error => console.error('Error fetching profile data:', error));

    // Fetch achievements data (replace with your actual API endpoint)
    fetch('/api/user/achievements')
        .then(response => response.json())
        .then(achievements => {
            // Update achievements list in the HTML
            const achievementsList = document.getElementById('achievements-list');
            achievements.forEach(achievement => {
                const listItem = document.createElement('li');
                listItem.textContent = achievement.name;
                achievementsList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching achievements data:', error));
});
