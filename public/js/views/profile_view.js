
var ProfileView = Backbone.View.extend({
    model: new UserModel(),
    template: _.template($('#profile-template').html()),
    events: {
        "click #edit-info": "editInfo",
        "click #delete-user": "deleteUser",
        "click #cancel-edit": "cancelEdit",
        "click #update-info": "updateInfo",
        "click #update-password": "updatePassword",
        "click #update-avatar": "updateAvatar"
    },
    editInfo: function () {
        var edit_template = _.template($('#profile-info-edit-template').html())
        this.$el.find('#profile-info').html(edit_template({ model: this.model }))
    },
    deleteUser: function () {
        const self = this
        $('#delete-confirmation').simpleConfirm({
            message: "Are you sure?",
            success: function () {

                self.model.fetch({
                    url: "http://localhost:3060/users/" + self.model.get('user_id'),
                    headers: { 'auth-token': localStorage.getItem('khata-token') },
                    type: 'DELETE',
                    success: function (response) {
                        localStorage.removeItem('khata-token');
                        window.location = "#login";
                    },
                    error: function (error, response) {
                        console.log(response)
                    }
                });

            }

        })
    },
    cancelEdit: function () {
        var initial_template = _.template($('#initial-profile-template').html())
        this.$el.find('#profile-info').html(initial_template())
    },
    updateInfo: function () {
        const name = $('#name').val();
        const email = $('#email').val();
        const mobile_number = $('#mob').val();
        const address = $('#address').val() || this.model.get('address');
        const user = new UserModel();
        if (mobile_number) {
            user.set('mobile_number', mobile_number);
        }
        if (address) {
            user.set('address', address);
        }
        user.set({ name, email });
        const self = this
        user.save(null, {
            url: "http://localhost:3060/users",
            type: 'PATCH',
            headers: { 'auth-token': localStorage.getItem('khata-token') },
            success: function (response) {
                self.render();
            },
            error: function (error, response) {
                var err = getUIMessage(response.responseJSON.messages)
                var view = new ErrorView({model : err })
                self.$el.find("#updateprofileinfo").html(view.render().$el)
            }
        })

    },

    updatePassword: function () {
        this.$el.find("#passwordinfo").html("");
        const current_password = $('#current-password').val();
        const new_password = $('#new-password').val();
        const confirm_password = $('#confirm-password').val();
        if (new_password == confirm_password) {
            const password = new UserModel({
                current_password, new_password
            });
            var self = this;
            password.save(null, {
                url: "http://localhost:3060/users/password",
                type: "PATCH",
                headers: { 'auth-token': localStorage.getItem('khata-token') },
                success: function (response) {
                    $('#current-password').val('');
                    $('#new-password').val('');
                    $('#confirm-password').val('');
                    //   setInterval(() => {
                    //        document.getElementById('updated-successfully').style.display="none";
                    //   }, 2000);
                    //   document.getElementById('updated-successfully').style.display="block";
                    var view = new ErrorView({ model: { messages: 'Password updated successfully' } })
                    self.$el.find("#passwordinfo").html(view.render().$el)
                },
                error: function (error, response) {
                    var err = self.getUIMessage(response.responseJSON.messages)
                    var view = new ErrorView({ model: err })
                    self.$el.find("#passwordinfo").html(view.render().$el)
                }
            })

        } else {
            var view = new ErrorView({ model: { messages: 'Passwords do not Match' } })
            this.$el.find("#passwordinfo").html(view.render().$el)
        }
    },
    updateAvatar:function(){
        var avatar_edit_modal_view = new AvatarUpdateModalView({});
        avatar_edit_modal_view.render();
        $(avatar_edit_modal_view.el).modal('show');
    },
    initialize: function () {
        this.render()
    },
    render: async function (data) {
        await this.model.fetch({
            url: "http://localhost:3060/users/profile",
            headers: { 'auth-token': localStorage.getItem('khata-token') },
            success: function (response) {
                this.model = new UserModel(response.toJSON())
            },
            error: function (error, response) {
                console.log(error, response);
            }
        })
        this.$el.html(this.template({ model: this.model }))
        var initial_template = _.template($('#initial-profile-template').html())
        this.$el.find('#profile-info').html(initial_template())
    }
})