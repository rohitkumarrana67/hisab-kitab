var TransactionView = Backbone.View.extend({
    className: "transaction-box",
    model: TransactionModel,
    collection: customer_collection,
    template: _.template($('#transaction-template').html()),
    initialize: function () {
        this.model.on("change", this.render, this)
    },
    events: {
        "click #edit": "editTransaction",
        "click #delete": "deleteTransaction"
    },
    deleteTransaction: async function () {
        const id = this.model.get('transaction_id')
        this.model.set({ transaction_id: id })

        const self = this
        $('#delete-confirmation').simpleConfirm({
            message: "Are you sure?",
            success: function () {


                self.model.save(null, {
                    url: "http://localhost:3060/users/customers/transactions/" + self.model.get('transaction_id'),
                    headers: { 'auth-token': localStorage.getItem('khata-token') },
                    success: async function (response) {
                        console.log("hello")
                    },
                    error: function (error, response) {
                        console.log(response);
                    }
                })

                self.remove();

            }

        })
    },
    editTransaction: function () {
        var transaction_edit_modal_view = new TransactionEditModalView({ model: this.model })
        transaction_edit_modal_view.render()
        $(transaction_edit_modal_view.el).modal('show')
    },
    render: function () {
        this.$el.html(this.template({ model: this.model }))
        return this
    }
})
