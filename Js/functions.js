var baseUrl =  "https://umfgcloud-autenticacao-service-7e27ead80532.herokuapp.com"

function login() {
    var email = document.getElementById("emailLog").value;
    var password = document.getElementById("passwordLog").value;

    if (email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    var data = {
        email: email,
        senha: password,
    };
    fetch(baseUrl + "/Autenticacao/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(async data => {
        if (data.ok) {
            var json = await data.json();
            document.cookie = "email=" + email + "; path=/;"; // Set the email in a cookie
            document.cookie = "token=" + json.token + "; path=/;"; // Set the token in a cookie
            document.cookie = "dataExpiracao=" + json.dataExpiracao + "; path=/;"; // Set the dataExpiracao in a cookie
            alert("Login successful!");
            window.location.href = "home.html"; // Redirect to the main page
        } else {
            alert(await data.text());
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

function register() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;


    if (email === "" || password === "" || confirmPassword === "") {
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    var data = {
        email: email,
        senha: password,
        senhaConfirmada: confirmPassword,
    };

    fetch(baseUrl + "/Autenticacao/registar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(async data => {
        if (data.ok) {
            alert("Registration successful! You can now log in.");
            window.location.href = "index.html"; // Redirect to the main page
        } else {
            alert(await data.text());
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
}