var ProfileView = Backbone.View.extend({
    collection: user_collection,
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
            },
            error: function (error, response) {
                console.log(error, response);
            }
        })
        return this;
    }
});
