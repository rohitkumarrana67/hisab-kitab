var LoginView = Backbone.View.extend({
    model: UserModel,
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

        user.save(null, {
            url: "http://localhost:3060/users/login",
            success: function (response) {
                localStorage.setItem('khata-token', response.toJSON().token);
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


