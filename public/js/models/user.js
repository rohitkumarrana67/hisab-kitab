define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    var UserModel = Backbone.Model.extend({
        url: "http://localhost:3060/users"

    });
    return UserModel;
})