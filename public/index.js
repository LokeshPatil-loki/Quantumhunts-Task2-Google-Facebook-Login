window.onload = () => {

    if (sessionStorage.getItem("loggedInUser")) {
        location.href = "User.html"
    }

    google.accounts.id.initialize({
        client_id: "252766198226-l19f78pqutpoch9dvt97cqlbv6vqo6ru.apps.googleusercontent.com",
        callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
        theme: "outline",
        size: "large",
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

    function statusChangeCallback(response) {
        console.log("Status Callback Response:");
        console.log(response);
    }
};

function handleCredentialResponse(response) {
    //   console.log("Encoded JWT ID token: " + response.credential);
    //   window.sessionStorage.setItem("jwt", response.credential);
    const obj = jwt_decode(response.credential);
    window.loggedInUser = {
        from: "Google",
        name: obj.given_name + " " + obj.family_name,
        email: obj.email,
        picture: obj.picture,
    }
    redirect();

}


document.getElementById("fblogin").addEventListener("click", e => {
    FB.login(function(response) {
        console.log(response);
        ar = response.authResponse;
        if (response.authResponse) {
            FB.api('/me', {
                fields: "id,name,email,picture"
            }, function(response) {
                window.loggedInUser = {
                    from: "Facebook",
                    name: response.name,
                    email: response.email,
                    picture: response.picture.data.url,
                }
                redirect();
            });

        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {
        scope: 'email,public_profile',
        return_scopes: true
    });
})

function redirect() {
    sessionStorage.setItem("loggedInUser", JSON.stringify(window.loggedInUser));
    location.href = "User.html";
}