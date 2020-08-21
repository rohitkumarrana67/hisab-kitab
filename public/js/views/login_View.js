var router = new AppRouter();
var LoginView = Backbone.View.extend({
    model: UserModel,
    template: _.template($('#login-template').html()),
    initialize: function () {
        this.render();
    },
    events: {
        'submit #login-form': 'login',
        'click #resetpassword' : 'reset'
    },
    login: function (e) {
        this.$el.find("#error").html("")
        $(".password").removeClass("mb-1")
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
                $(".password").addClass("mb-1")
                var err = getUIMessage(response.responseJSON.messages);
                var view = new ErrorView({model: err})
                self.$el.find("#error").html(view.render().$el)
            }
        });
    },
    reset: function(e) {
        var li = $(e.target);
        router.navigate(li.attr("data-url"),{trigger: true});
    },
    render: function () {
        this.$el.html(this.template());
        return this;
    }
});


