// Selectors
const form = document.getElementById("form");
const result = document.getElementById("result");

// Handlers
form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Definitions
    const formData = new FormData(form);
    var object = {};
    
    // construct object, display waiting
    formData.forEach((value, key) => {
        object[key] = value;
    });
    var json = JSON.stringify(object);
    result.style.display = "inline";
    result.innerHTML = "Please wait...";

    // api call, display response
    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: json
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            result.innerHTML = json.message;
        } else {
            result.innerHTML = json.message;
        }
    })
    .catch((error) => {
        result.innerHTML = "Something went wrong!";
    })
    .then(function () {
        form.reset();
        setTimeout(() => {
            result.style.display = "none";
        }, 5000);
    });
});