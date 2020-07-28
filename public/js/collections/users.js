define(['jquery', 'underscore', 'backbone', 'models/user'], function ($, _, Backbone, UserModel) {
    var UserCollection = Backbone.Collection.extend({
        model: UserModel,
        url: "http://localhost:3060/users"

    });
    var user_collection = new UserCollection();
    return user_collection;
})

