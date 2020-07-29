define(['jquery', 'underscore', 'backbone', 'models/user', 'collections/users'], function ($, _, Backbone, UserModel, UserCollection) {

    var LoginView = Backbone.View.extend({
        model: UserModel,
        collection: UserCollection,
        template: _.template($('#login-template').html()),
        initialize: function () {
            this.render();
        },
        events: {
            'submit': 'login'
        },
        login: function (e) {
            e.preventDefault();
            var email = $('#email').val();
            var password = $('#password').val();

            var user = new this.model({
                email,
                password
            });
            // this.model.url('login');
            user.save(null, {
                url: "http://localhost:3060/users/login",
                success: function (response) {
                    localStorage.setItem('khata-token', response.toJSON().token);
                    var token = localStorage.getItem('khata-token');
                    console.log(response.toJSON());
                    window.location = "#customers";

                },
                error: function (err, response) {
                    console.log(response);

                }
            });


        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });

    return LoginView;

});