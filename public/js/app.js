define(['jquery', 'underscore', 'backbone', 'views/login_View', 'views/signup_view', 'views/landing_view', 'router'], function ($, _, Backbone, LoginView, SignupView, LandingView, AppRouter) {

    var initialize = function () {

        var landingView = new LandingView({
            el: ".landing"
        })

        var router = new AppRouter();
        Backbone.history.start();
    }

    return {
        initialize: initialize
    }


});