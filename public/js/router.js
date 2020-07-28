define(['jquery', 'underscore', 'backbone', 'views/login_View', 'views/signup_view', 'views/profile_view'], function ($, _, Backbone, LoginView, SignupView, ProfileView) {


    var AppRouter = Backbone.Router.extend({
        routes: {
            'login': 'loginView',
            'signup': 'signupView',
            'profile': 'profileView',
        },
        loginView: function () {
            var login_view = new LoginView({
                el: '#content'
            });
        },
        signupView: function () {
            var signup_view = new SignupView({
                el: "#content"
            });
        },
        profileView: function (params) {
            var profile_view = new ProfileView({
                el: "#content"
            });
        }


    });

    return AppRouter;

});