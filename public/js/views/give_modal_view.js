var GiveModalView = Backbone.View.extend({
    className: "modal",
    attributes: {
        id: "add-users-modal",
        tabindex: "-1",
        role: "dialog"
    },
    events: {
        "click #give": 'give',
        "click #close": 'removeFromDOM'
    },
    give: function (params) {
        let customer_id = this.model.customer_id;
        var amount = $('#give-amount-' + customer_id).val();
        var message = $('#give-message-' + customer_id).val();

        var transaction = new TransactionModel({
            amount,
            message
        })

        transaction.save(null, {
            url: `http://localhost:3060/users/customer/${customer_id}/give`,
            headers: { 'auth-token': localStorage.getItem('khata-token') },
            success: function (response) {
                location.reload();
            },
            error: function (error, response) {
                console.log(response);
            }
        })

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