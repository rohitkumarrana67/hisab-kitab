define(['jquery', 'underscore', 'backbone', 'collections/users'], function ($, _, Backbone, UserCollection) {

    var ProfileView = Backbone.View.extend({
        collection: UserCollection,
        initialize: function () {
            this.render();
        },
        render: function () {
            this.collection.fetch({
                url: "http://localhost:3060/users/profile",
                headers: { 'auth-token': localStorage.getItem('khata-token') },
                success: function (response) {
                    console.log(response.toJSON());
                },
                error: function (error, response) {
                    console.log(error, response);
                }
            })
            this.$el.html("Profile VIEW");
            return this;
        }
    });
    return ProfileView;

});