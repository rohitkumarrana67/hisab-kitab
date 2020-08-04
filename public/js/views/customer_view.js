


var CustomerView = Backbone.View.extend({
    model: CustomerModel,
    tagName: "tr",
    template: _.template($('#customer-template').html()),
    events: {
        'click #give': "creditCustomer"
    },
    creditCustomer: function () {
        var give_modal_view = new GiveModalView({
            model: this.model
        });
        give_modal_view.render();
        $(give_modal_view.el).modal('show');

    },
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html(this.template(this.model));
        return this;
    }
});

