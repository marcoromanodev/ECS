document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(function() {
            alert('Message Sent! We will get back to you shortly.');
        }, function(error) {
            console.log('FAILED...', error);
            alert('Message could not be sent. Please try again.');
        });
});
