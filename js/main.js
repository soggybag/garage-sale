
// Initial Parse!
Parse.initialize("j0ibJi0X0h25rk1eA9kb5tnSOFy11Sni8lVPd8QO", "oFEufrJ4HMIrjAshy7WBTdi4iEu6BZRYYOHyBbuh");


// Page Navigation
function showPage(pageId) {
    $(".page").hide();  
    $(pageId).show(); 
    $(pageId).trigger("page-show");
}


$(window).on("hashchange", function(event){
    showPage(location.hash);
});


location.hash = "";
location.hash = "#garage-sale";


function checkLogInStatus() {
    if (Parse.User.current()) {
        // Logged In
        $("body").addClass("logged-in");
    } else {
        // Logged out
        $("body").removeClass("logged-in");
    }
}

checkLogInStatus();





// Register form
$("#register-form").submit(function(event){
    event.preventDefault();
    
    var username = $("#register-username").val();
    var password = $("#register-password").val();
    var password2 = $("#register-password-2").val();
    
    if (password === password2) {
        var user = new Parse.User();
        user.set("username", username);
        user.set("password", password);
        
        user.signUp(null, {
            success:function(user){
                console.log("Registration Succeeded!");
                checkLogInStatus();
            }, error:function(user, error){
                console.log("Registration error:"+error.message);
            }
        });
    }
});


// Login Form 
$("#login-form").submit(function(event){
    event.preventDefault();
    
    var username = $("#login-username").val();
    var password = $("#login-password").val();
    
    Parse.User.logIn(username, password, {
        success: function(user){
            console.log("Login succeeded!");
            checkLogInStatus();
        }, error: function(user, error){
            console.log("Login error:"+error.message);
        } 
    });
});


// Listen for page-show from logout
$("#logout").on("page-show", function(event){
    console.log("Log Out page-show!");
    // Log Out with Parse
    Parse.User.logOut();
    checkLogInStatus();
});

$("#register").on("page-show", function(event){
    console.log("Showing Register Page!");
});









