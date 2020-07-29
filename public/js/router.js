define(['jquery', 'underscore', 'backbone', 'views/login_View', 'views/signup_view', 'views/profile_view', 'views/Customers_view'], function ($, _, Backbone, LoginView, SignupView, ProfileView, CustomersView) {


    var AppRouter = Backbone.Router.extend({
        routes: {
            'login': 'loginView',
            'signup': 'signupView',
            'profile': 'profileView',
            'customers': 'customersView'
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
        profileView: function () {
            var profile_view = new ProfileView({
                el: "#content"
            });
        },
        customersView: function () {
            var customers_view = new CustomersView({
                el: "#content"
            });
            customers_view.render();
        }


    });

    return AppRouter;

});