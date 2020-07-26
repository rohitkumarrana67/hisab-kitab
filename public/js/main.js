



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
})