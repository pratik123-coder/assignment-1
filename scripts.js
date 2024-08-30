// Common Functions

// Update Navbar based on user's login status and role
function updateNavbar() {
    const name = sessionStorage.getItem("name");
    const role = sessionStorage.getItem("role");
    const username = sessionStorage.getItem("username");

    if (name && role) {
        document.getElementById("navbar").innerHTML = `
            <li><a href="index.html">Home</a></li>
            ${role === 'admin' ? '<li><a href="reports.html">Reports</a></li>' : ''}
            <li><a href="services.html">Services</a></li>
            <li><a href="booking.html">Bookings</a></li>
            <li><a href="#" id="logout">Logout</a></li>
            <li><a href="#">Welcome, ${username} (${name})</a></li>
        `;

        document.getElementById("logout").onclick = function() {
            sessionStorage.clear();
            alert('Logged out successfully');
            location.assign('index.html');
        };
    }
}

// Start countdown timer
function startCountdown() {
    const endTime = new Date().getTime() + 10 * 60000; // 10 minutes from now
    const timeInterval = setInterval(() => {
        const now = new Date().getTime();
        const diff = endTime - now;
        if (diff > 0) {
            const mins = Math.floor(diff / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);
            document.getElementById('timer').innerHTML = `Offer expires in: ${mins}m ${secs}s`;
        } else {
            document.getElementById('timer').innerHTML = `Offer has expired`;
            clearInterval(timeInterval);
        }
    }, 1000);
}

// Login Functionality
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch('creds.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(user => user.username === username && user.password === password);
            const messageElement = document.getElementById("message");

            if (user) {
                sessionStorage.setItem("username", user.username);
                sessionStorage.setItem("name", user.name);
                sessionStorage.setItem("role", user.role);

                messageElement.textContent = `Welcome, ${user.name}!`;
                alert(`Login successful! Welcome ${user.username}`);
                location.assign('index.html');
            } else {
                messageElement.textContent = "Invalid username or password.";
                alert('Invalid credentials, please try again.');
            }
        })
        .catch(error => console.error('Error:', error));
}

// Service Page Functionality
function handleBookService(serviceName) {
    localStorage.setItem("selectedService", serviceName);
    location.assign('booking.html');
}

// Handle Go Back button
function handleGoBack() {
    history.back(); // Navigate to the previous page
}

// Reports Page Functionality (Admin Only)
function checkAdminAccess() {
    const role = sessionStorage.getItem("role");

    if (role !== 'admin') {
        alert("Access denied! Admins only.");
        location.assign('login.html');
    } else {
        loadReports();
    }
}

// Load mock service booking reports
function loadReports() {
    const reportContent = document.getElementById('reportContent');
    const mockReports = [
        { customer: "John Doe", service: "Preventive Maintenance", date: "2024-08-01" },
        { customer: "Jane Smith", service: "Body Repair", date: "2024-08-02" },
        { customer: "Bob Johnson", service: "Car Care", date: "2024-08-03" }
    ];

    let reportHtml = '<table>';
    reportHtml += '<tr><th>Customer Name</th><th>Service</th><th>Date</th></tr>';

    mockReports.forEach(report => {
        reportHtml += `<tr><td>${report.customer}</td><td>${report.service}</td><td>${report.date}</td></tr>`;
    });

    reportHtml += '</table>';
    reportContent.innerHTML = reportHtml;
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function() {
    updateNavbar();

    const loginForm = document.getElementById("loginForm");
    if (loginForm) loginForm.onsubmit = handleLogin;

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

    const bookServiceButton = document.getElementById("bookService");
    if (bookServiceButton) {
        bookServiceButton.onclick = function() {
            const serviceName = this.dataset.serviceName || "Default Service";
            handleBookService(serviceName);
        };
    }

    const goBackButton = document.getElementById("goBack");
    if (goBackButton) goBackButton.onclick = handleGoBack;

    const timerElement = document.getElementById('timer');
    if (timerElement) startCountdown();

    if (document.body.classList.contains('reports-page')) {
        checkAdminAccess();
    }
});
