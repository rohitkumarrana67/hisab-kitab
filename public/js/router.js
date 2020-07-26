define(['jquery', 'underscore', 'backbone', 'views/login_View', 'views/signup_view', 'views/landing_view'], function ($, _, Backbone, LoginView, SignupView, LandingView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            'login': 'loginView',
            'signup': 'signupView'
        },
        loginView: function () {
            var loginView = new LoginView({
                el: '#content'
            });
        },
        signupView: function () {
            var signupView = new SignupView({
                el: "#content"
            });
        }
    });

    return AppRouter;

});