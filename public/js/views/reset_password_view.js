var resetView = Backbone.View.extend({
    model: UserModel,
    initialize: function(){
        this.template = _.template($('#reset-template').html());
    },
    events:{
        'click #send-mail': 'sendMail'
    },
    sendMail : function(){
        var email= $("#reset-email").val()
        var data = new this.model({ email })
        console.log(data)
        var self = this;
        data.save(null, {
            url: "http://localhost:3060/users/forgotpassword",
            success: function (response) {
                self.$el.find("#send-mail").text("Resend Link")
                self.$el.find("#trackinfo").html("<h6 class='text-success'>An email with an activation link has been sent to your account.</h6>")
            },
            error: function (err, response) {
                var err = getUIMessage(response.responseJSON.messages)
                var view = new ErrorView({model : err})
                self.$el.find("#trackinfo").html(view.render().$el)
            }
        });
    },
    render: function(){
        this.$el.html(this.template())
        return this
    }
})