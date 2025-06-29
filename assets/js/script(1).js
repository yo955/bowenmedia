function toggleMenu() {
    const menuButton = document.querySelector('.menu-button');
    const navLinks = document.querySelector('.nav-links');
    menuButton.classList.toggle('active');
    navLinks.classList.toggle('active');
}

// tab
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');

tabs.forEach(tab => {
    tab.addEventListener('mouseover', () => {
        // Hide all content
        contents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Show corresponding content
        const targetContent = document.getElementById(tab.dataset.content);
        targetContent.classList.add('active');
    });
});


// 
// ///////////////////////// carousel
// const carouselTrack = document.querySelector('.carousel-track');
// const imageWidth = document.querySelector('.carousel-track img').offsetWidth;
// let currentPosition = 0;
// const animationDuration = 10000; // 10 seconds

// function animateCarousel() {
//   currentPosition -= 1; // Adjust speed here

//   if (currentPosition <= -imageWidth * 6) {
//     currentPosition = 0;
//   }
//   carouselTrack.style.transform = `translateX(${currentPosition}px)`;
//   requestAnimationFrame(animateCarousel);
// }

// animateCarousel();

// footer

  function updateDateTime() {
            const now = new Date();
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const day = now.getDate();
            const month = monthNames[now.getMonth()];
            const year = now.getFullYear();

            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? String(hours).padStart(2, '0') : '12'; // the hour '0' should be '12'

            const dateTimeString = `${day} ${month} ${year} ${hours}:${minutes}:${seconds} ${ampm}`;
            document.getElementById('dateTime').textContent = dateTimeString;

            let greeting = '';
            if (now.getHours() < 12) {
                // greeting = 'Good Morning!';
            } else if (now.getHours() < 18) {
                // greeting = 'Good Afternoon!';
            } else {
                // greeting = 'Good Evening!';
            }
            document.getElementById('greeting').textContent = greeting;
        }

        setInterval(updateDateTime, 1000);
        updateDateTime(); // Initial call to display immediately



    // footer

