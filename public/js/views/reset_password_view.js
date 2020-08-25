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
        var self = this;
        data.save(null, {
            url: "http://localhost:3060/users/forgotpassword",
            success: function (response) {
                console.log("Success")
                console.log(response)
                if(response.get('message') == "An email with a link to reset your password has been sent to your email id."){
                    self.$el.find("#send-mail").text("Resend Link")
                    self.$el.find("#trackinfo").html("<h6 class='text-success'>An email with a reset password link has been sent to your account.</h6>")
                }
                else{
                    // var err = getUIMessage(response.responseJSON.messages)
                    var view = new ErrorView({model : {messages : response.get('message')}})
                    self.$el.find("#trackinfo").html(view.render().$el)
                }
            },
            error: function (err, response) {
                console.log("Failure")
                console.log(response)
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