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