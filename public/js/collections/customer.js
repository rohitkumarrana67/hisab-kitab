define(['jquery', 'underscore', 'backbone', 'models/customer'], function ($, _, Backbone, CustomerModel) {
    var CustomerCollection = Backbone.Collection.extend({
        model: CustomerModel,
        url: "http://localhost:3060/users/customers"

    });
    var customer_collection = new CustomerCollection();
    return customer_collection;
})