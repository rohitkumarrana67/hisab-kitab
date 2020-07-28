define(['jquery', 'underscore', 'backbone', 'models/user', 'collections/users'], function ($, _, Backbone, UserModel, UserCollection) {

    var SignupView = Backbone.View.extend({
        model: UserModel,
        collection: UserCollection,
        template: _.template($('#signup-template').html()),
        initialize: function () {
            this.render();
        },
        events: {
            'submit': 'createUser'
        },
        createUser: function (e) {
            e.preventDefault();
            var name = $('#user_name').val();
            var email = $('#email').val();
            var password = $('#password').val();

            var user = new this.model({
                name,
                email,
                password
            });

            const self = this;
            // this.collection.url();
            console.log(user);
            user.save(null, {
                success: function (response) {
                    self.collection.add(user);
                    localStorage.setItem('khata-token', response.toJSON().token);
                    var token = localStorage.getItem('khata-token');
                    console.log(response.toJSON());

                },
                error: function (err, response) {
                    console.log(response)
                }
            });

        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });

    return SignupView;

});