var TransactionEditModalView = Backbone.View.extend({
    className: "modal",
    attributes: {
        id: "transaction-edit-modal",
        tabindex: "-1",
        role: "dialog"
    },
    events: {
        "click #edit": 'edit',
        "click #close": 'removeFromDOM'
    },
    edit: function () {
        let customer_id = this.model.get('customer_id')
        var amount = $('#transaction-amount-' + customer_id).val()
        var message = $('#transaction-message-' + customer_id).val()
        var type = ""
        if(this.model.get('amount') < 0){
            type = "take"
        } else {
            type = "give"
        }

        var transaction = new TransactionModel({ amount, message })
        var self = this
        
        transaction.save(null, {
            url: `http://localhost:3060/users/customer/${customer_id}/${type}`,
            headers: { 'auth-token': localStorage.getItem('khata-token') },
            success: function (response) {
                self.model.set('balance', transaction.get('balance'))
            },
            error: function (error, response) {
                console.log(response)
            }
        })
        this.removeFromDOM()
    },
    removeFromDOM: function () {
        $('#transaction-edit-modal').remove()
    },
    template: _.template($('#transaction-edit-modal-template').html()),
    initialize: function () {
    },
    render: function () {
        this.$el.html(this.template({ model: this.model }))
    }
})
