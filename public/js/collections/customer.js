
var CustomerCollection = Backbone.Collection.extend({
    model: CustomerModel,
    url: "http://localhost:3060/users/customers"

});
var customer_collection = new CustomerCollection();
