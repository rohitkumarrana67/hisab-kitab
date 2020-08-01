define(['jquery', 'underscore', 'backbone', 'models/user', 'views/login_View', 'views/signup_view', 'views/profile_view', 'views/customers_view'], function ($, _, Backbone, UserModel, LoginView, SignupView, ProfileView, CustomersView) {


    var AppRouter = Backbone.Router.extend({
        routes: {
            'signup': 'signupView',
            'login': 'loginView',
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
            if (!localStorage.getItem('khata-token')) {
                $('.before-auth').show();
                $('.after-auth').hide();
                window.location = '#';
            }
            $('.before-auth').hide();
            $('.after-auth').show();

            var profile_view = new ProfileView({
                el: "#content"
            });
        },
        customersView: function () {
            if (!localStorage.getItem('khata-token')) {
                $('.before-auth').show();
                $('.after-auth').hide();
                window.location = '#';
            }
            $('.before-auth').hide();
            $('.after-auth').show();
            var customers_view = new CustomersView({
                el: "#content"
            });
            customers_view.render();
        }


    });

    return AppRouter;

});