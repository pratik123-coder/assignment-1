document.addEventListener("DOMContentLoaded", function() {
    startCountdown();
});

function startCountdown() {
    const endTime = new Date().getTime() + 10 * 60000; // 10 minutes from now
    const timeInterval = setInterval(() => { // runs every second
        const now = new Date().getTime(); // current time
        const diff = endTime - now; // difference between end time and current time
        if (diff > 0) {         // if there is still time left
            const mins = Math.floor(diff / (1000 * 60)); // convert milliseconds to minutes
            const secs = Math.floor((diff % (1000 * 60)) / 1000); // convert remaining milliseconds to seconds
            document.getElementById('timer').innerHTML = `Offer expires in: ${mins}m ${secs}s`; // display the time left
        } else {
            document.getElementById('timer').innerHTML = `Offer has expired`; // display the time left
            clearInterval(timeInterval); // stop the countdown
        }
    }, 1000); // runs every second
}

const exploreMoreButton = document.getElementById("exploreMore");
if (exploreMoreButton) {
    exploreMoreButton.onclick = function() {
        alert("Hello World!");
        location.assign('services.html');
    };
}

document.querySelectorAll('.more-details').forEach(button => {
    button.onclick = function() {
        location.assign(this.dataset.service + '.html');
    };
}); 


document.addEventListener("DOMContentLoaded", function() {  // Wait for the DOM to be fully loaded
    const loginForm = document.getElementById("loginForm"); // Get the login form

    if (loginForm) { // If the login form exists
        loginForm.onsubmit = function(event) { // When the form is submitted
            event.preventDefault(); // Prevent form submission
            const username = document.getElementById("username").value; // Get the username
            const password = document.getElementById("password").value; // Get the password

            fetch('creds.json') // Fetch the credentials from the JSON file
                .then(response => response.json()) // Parse the JSON response
                .then(users => { // When the users are loaded
                    const user = users.find(user => user.username === username && user.password === password); // Find the user with the given username and password
                    const messageElement = document.getElementById("message"); // Get the message element

                    if (user) { // If the user exists
                        sessionStorage.setItem("username", user.username); // Store the username in the session storage
                        sessionStorage.setItem("name", user.name); // Store the name in the session storage
                        sessionStorage.setItem("role", user.role); // Store the role in the session storage

                        messageElement.textContent = `Welcome, ${user.name}!`; // Display a welcome message
                        alert(`Login successful!, Welcome ${user.username}`); // Display an alert
                        location.assign('index.html'); // Redirect to the home page
                    } else {
                        messageElement.textContent = "Invalid username or password."; // Display an error message
                        alert('Invalid credentials, please try again.'); // Display an alert
                    }
                })
                .catch(error => console.error('Error:', error)); // Log any errors to the console
        };
    }

    function customizeNavbar() { // Function to customize the navbar
        const navbar = document.getElementById("navbar"); // Get the navbar element
        const username = sessionStorage.getItem("username"); // Get the username from the session storage
        const name = sessionStorage.getItem("name");    // Get the name from the session storage
        const role = sessionStorage.getItem("role"); // Get the role from the session storage

        if (username && role) { // If the username and role exist
            navbar.innerHTML = ` // Customize the navbar
                <li><a href="index.html">Home</a></li>
                <li><a href="#">Welcome, ${username}</a></li>
                ${role === 'admin' ? '<li><a href="reports.html">Reports</a></li>' : ''}
                <li><a href="services.html">Services</a></li>
                <li><a href="booking.html">Bookings</a></li>
                <li><a href="#" id="logout">Logout</a></li>
            `;

            document.getElementById("logout").onclick = function() { // When the logout link is clicked
                sessionStorage.clear(); // Clear the session storage
                alert('Logged out successfully'); // Display an alert
                location.assign('index.html'); // Redirect to the home page
            };
        }
    }

    customizeNavbar(); // Call the function to customize the navbar
});
