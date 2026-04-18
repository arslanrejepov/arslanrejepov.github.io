// Modal Logic
const modal = document.getElementById("certModal");
const modalImg = document.getElementById("certImage");
const captionText = document.getElementById("caption");

// Select all certificate links
document.querySelectorAll('.cert-link').forEach(item => {
    item.addEventListener('click', function() {
        modal.style.display = "block";
        modalImg.src = this.getAttribute('data-src'); // Gets image path from data-src
        captionText.innerHTML = this.innerText; // Sets caption to certificate name
    });
});

// Close modal when clicking 'X'
document.querySelector('.close-modal').onclick = function() {
    modal.style.display = "none";
};

// Close modal when clicking anywhere outside the image
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};