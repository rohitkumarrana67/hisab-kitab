var GiveModalView = Backbone.View.extend({
    className: "modal",
    attributes: {
        id: "add-users-modal",
        tabindex: "-1",
        role: "dialog"
    },
    events: {
        "click #debit": 'debit',
        "click #close": 'removeFromDOM'
    },
    debit: function (params) {
        console.log($('#give-amount-' + this.model.customer_id).val());
        console.log($('#give-message-' + this.model.customer_id).val());
        window.location = "#customers"
    },
    removeFromDOM: function () {
        console.log("hello");
        $('#add-users-modal').remove();
    },
    template: _.template($('#give-modal-template').html()),
    initialize: function () {
    },
    render: function () {
        this.$el.html(this.template(this.model));
    }
});
