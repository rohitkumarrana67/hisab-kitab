var LoginView = Backbone.View.extend({
    model: UserModel,
    template: _.template($('#login-template').html()),
    initialize: function () {
        this.render();
    },
    events: {
        'submit #login-form': 'login'
    },
    login: function (e) {
        this.$el.find("#error").html("")
        $(".password").removeClass("mb-0")
        e.preventDefault();
        var email = $('#email').val();
        var password = $('#password').val();

        var user = new this.model({
            email,
            password
        });
        var self= this;
        user.save(null, {
            url: "http://localhost:3060/users/login",
            success: function (response) {
                localStorage.setItem('khata-token', response.toJSON().token);
                window.location = "#customers";
            },
            error: function (err, response) {
                $(".password").addClass("mb-0")
                var err = self.getUIMessage(response.responseJSON.messages);
                var view = new ErrorView({model: err})
                self.$el.find("#error").html(view.render().$el)
            }
        });


    },
    getUIMessage: function(message) {
        if(message=="unable to login" || message=="'email' must be a valid email" || message=="'password' length must be at least 7 characters long"){
            return {messages:"Invalid Username or Password"}
        }
        if(message == "'password' is not allowed to be empty"){
            return {messages:"Password cannot be blank"}
        }
        if(message == "'email' is not allowed to be empty"){
            return {messages:"Email cannot be blank"}
        }
    },
    render: function () {
        this.$el.html(this.template());
        return this;
    }
});


