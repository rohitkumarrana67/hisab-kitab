



require.config({
    paths: {
        jquery: "./lib/jquery",
        underscore: "./lib/underscore",
        backbone: "./lib/backbone",
        models: "./models",
        collections: "./collections",
        views: "./views"
    }
})

define(['app', 'models/user'], function (App, UserModel) {
    App.initialize();

    if (localStorage.getItem('khata-token')) {
        $('.after-auth').show();
        window.location = '#customers';
    }
    if (!localStorage.getItem('khata-token')) {
        $('.before-auth').show();
        window.location = '#';
    }

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
})