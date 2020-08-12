var router = new AppRouter();


var CustomerView = Backbone.View.extend({
    model: CustomerModel,
    tagName: "tr",
    template: _.template($('#customer-template').html()),
    events: {
        'click #give': "creditCustomer",
        'click #take': "debitCustomer",
        'click #summary': "summaryView"
    },
    creditCustomer: function () {
        var give_modal_view = new GiveModalView({
            model: this.model
        });
        give_modal_view.render();
        $(give_modal_view.el).modal('show');

    },

    debitCustomer: function () {
        var take_modal_view = new TakeModalView({
            model: this.model
        });
        take_modal_view.render();
        $(take_modal_view.el).modal('show');

    },

    summaryView: function (e) {
        var $target = $(e.target)
        router.navigate("customers/" + this.model.get('customer_id') + "/" + $target.attr("data-url"), { trigger: true })
    },

    initialize: function () {
        this.model.on("change", this.render, this);
        this.render();
    },
    render: function () {
        this.$el.html(this.template({ model: this.model }));
        return this;
    }
});

