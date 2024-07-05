document.addEventListener('DOMContentLoaded', function() {
    function setRandomBackground() {
        const bgNumber = Math.floor(Math.random() * 10) + 1;
        document.body.style.backgroundImage = `url('bg/bg${bgNumber}.webp')`;
    }
    setRandomBackground();
});
