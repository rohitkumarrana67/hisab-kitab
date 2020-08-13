var ProfileView = Backbone.View.extend({
    collection: user_collection,
    model:UserModel,
    template: _.template($('#profile-template').html()),
    initialize: function () {
        this.render();
    },
    events: {
        "click #edit-info": "editDetails",
        "click #cancel": "cancelEvent",
        "click #update-info": "updateDetails"
    },
    editDetails: function () {
        var edit_template = _.template($('#profile-info-edit-template').html())
        this.$el.find('#profile-info').html(edit_template({model : this.model}))
    },
    cancelEvent: function () {
        this.render()
    },
    updateDetails: function () {
        console.log("updated")
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
   
});
