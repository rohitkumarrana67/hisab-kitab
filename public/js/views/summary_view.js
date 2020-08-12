
var SummaryView = Backbone.View.extend({
    collection: transaction_collection,
    template: _.template($('#summary-template').html()),
    initialize: function (data) {
        this.model.fetch({
            url : "http://localhost:3060/users/customers/" + data.model.get('customer_id'),
            headers: { 'auth-token': localStorage.getItem('khata-token') },
            success: response => {
                this.model = new CustomerModel(response)
            }
        })
        this.render()
    },
    events: {
        "click #edit-info": "editDetails",
        "click #cancel": "cancelEvent",
        "click #update-info": "updateDetails"
    },
    editDetails: function () {
        var edit_template = _.template($('#customer-info-edit-template').html())
        this.$el.find('#customer-info').html(edit_template({model : this.model}))
    },
    cancelEvent: function () {
        this.render()
    },
    updateDetails: function () {
        console.log("updated")
    },
    render: function () {
        this.$el.html(this.template({ model: this.model }))
        var customer_id = this.model.get('customer_id')
        var $transactions_list = $("#transactions")
        this.collection.fetch({
            url: "http://localhost:3060/users/customer/" + customer_id + "/transactions",
            headers: { 'auth-token': localStorage.getItem('khata-token') },
            success: function (response) {
                response.each(data => {
                    $transactions_list.append((new TransactionView({ model: data })).render().$el)
                })
            },
            error: function (err, response) {
                console.log(response)
            }

        })
    }
})
