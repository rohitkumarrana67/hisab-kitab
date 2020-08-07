var TakeModalView = Backbone.View.extend({
    className: "modal",
    attributes: {
        id: "add-users-modal",
        tabindex: "-1",
        role: "dialog"
    },
    events: {
        "click #take": 'take',
        "click #close": 'removeFromDOM'
    },
    take: function (params) {
        let customer_id = this.model.get('customer_id');
        var amount = $('#take-amount-' + customer_id).val();
        var message = $('#take-message-' + customer_id).val();

        var transaction = new TransactionModel({
            amount,
            message
        })

        var self = this
        transaction.save(null, {
            url: `http://localhost:3060/users/customer/${customer_id}/take`,
            headers: { 'auth-token': localStorage.getItem('khata-token') },
            success: function (response) {
                self.model.set('balance', transaction.get('balance'))
            },
            error: function (error, response) {
                console.log(response);
            }
        })
        this.removeFromDOM()
    },
    removeFromDOM: function () {
        console.log("hello");
        $('#add-users-modal').remove();
    },
    template: _.template($('#take-modal-template').html()),
    initialize: function () {
    },
    render: function () {
        this.$el.html(this.template({model : this.model}));
    }
});
