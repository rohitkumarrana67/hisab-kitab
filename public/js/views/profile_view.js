var ProfileView = Backbone.View.extend({
    collection: user_collection,
    model:UserModel,
    template: _.template($('#profile-template').html()),
    initialize: function () {
        this.render();
    },
    render: function () {
        var self = this;
        this.collection.fetch({
            url: "http://localhost:3060/users/profile",
            headers: { 'auth-token': localStorage.getItem('khata-token') },
            success: function (response) {
                console.log(response.toJSON()[0]);
                self.$el.html(self.template(response.toJSON()[0]));
                // console.log(response.get('name'));
            },
            error: function (error, response) {
                console.log(error, response);
            }
        })

        return this;
    },
    events: {
        'click #change_password': 'changepassword',
        'click #update_profile': 'updateprofile',
        'click #collapse':'collapsepage'
    },
    collapsepage:function(){
     $('.cpass').on('click',function(){
         $('.cpass1').addClass('show');
         $('.cpass1').removeClass('show');
         alert("working");
     })
    },
    updateprofile:function(e){
        var user_name = $('#InputName').val();
        var email = $('#InputEmail').val();
        var mobile_number = $('#InputMob').val();
        var user = new UserModel({ user_name, email, mobile_number});
        var self=this; 
        user.save(null, {
            url: "http://localhost:3060/users/User",
            headers: { 'auth-token': localStorage.getItem('khata-token') },
            success: function (response) {
                alert("working");
            },
            error: function (error, response) {
                console.log(response);
            }
        })
    },
    changepassword: function (e) {
        e.preventDefault()
        
        var oldpassword=$('#oldpass').val();
        var newpassword=$('#newpass').val();
        var confirmpassword=$('#confirmpass');
        var customer = new UserModel({ newpassword });
        var self = this;
        this.collection.fetch({
            headers: { 'auth-token': localStorage.getItem('khata-token') },
            success: function (response) {
                response.each(user => {
                    // let pass = user.get('name');
                    console.log("working");
                    // console.log(pass);

                    // transaction.fetch({
                    //     url: `http://localhost:3060/users/customer/balance/${customer_id}`,
                    //     headers: { 'auth-token': localStorage.getItem('khata-token') },
                    //     success: function (balance) {
                    //         customer.set('balance', balance.get('balance'))
                    //         $customers_list.append((new CustomerView({ model: customer })).render().$el);
                    //     },
                    //     error: function (error, response) {
                    //         console.log(response);
                    //     }
                    // })


                });

            },
            error: function (err) {
                console.log(err);
            }
        });

        alert("password has been changed ");
    }

});
