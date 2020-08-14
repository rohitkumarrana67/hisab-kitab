
var TransactionView = Backbone.View.extend({
    className : "transaction-box",
    model: TransactionModel,
    template: _.template($('#transaction-template').html()),
    initialize: function () {
        this.model.on("change", this.render, this)
    },
    events: {
        "click #edit": "editTransaction"
    },
    editTransaction: function () {
        var transaction_edit_modal_view = new TransactionEditModalView({ model: this.model })
        transaction_edit_modal_view.render()
        $(transaction_edit_modal_view.el).modal('show')
    },
    render: function () {
        console.log(this.model)
        this.$el.html(this.template({ model: this.model }))
        return this
    }
})
