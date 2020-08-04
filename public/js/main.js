var landingView = new LandingView({
    el: ".landing"
})

var router = new AppRouter();
Backbone.history.start();



$('#logout').click(function () {
    const user = new UserModel();
    user.save(null, {
        url: "http://localhost:3060/users/logout",
        headers: { 'auth-token': localStorage.getItem('khata-token') },
        success: function (response) {
            console.log("ok");
            localStorage.removeItem('khata-token');
            window.location.href = "http://localhost:3060/";
        },
        error: function (error, response) {
            console.log(response)
        }
    })

});
