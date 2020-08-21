var SignupView = Backbone.View.extend({
    model: UserModel,
    template: _.template($('#signup-template').html()),
    initialize: function () {
        this.render();
    },
    events: {
        'submit #signup-form': 'createUser'
    },
    createUser: function (e) {
        $("#signuperror").html("")
        $(".signup").removeClass("mb-1")
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
        user.save(null, {
            url: "http://localhost:3060/users",
            success: function (response) {
                localStorage.setItem('khata-token', response.toJSON().token);
                window.location = "#customers";
            },
            error: function (err, response) {
                var err = getUIMessage(response.responseJSON.messages)
               var view = new ErrorView({model: err})
               self.$el.find("#signuperror").html(view.render().$el)
               $(".signup").addClass("mb-1")
            }
        });

    },
    render: function () {
        this.$el.html(this.template());
        return this;
    }
});
