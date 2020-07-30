



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

define(['app'], function (App) {
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
        localStorage.removeItem('khata-token');
        window.location.href = "http://localhost:3060/";
    })
})