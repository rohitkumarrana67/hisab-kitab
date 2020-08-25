var SummaryView = Backbone.View.extend({
    collection: transaction_collection,
    template: _.template($('#summary-template').html()),
    initialize: function (data) {
        this.render(data.model)
    },
    events: {
        "click #edit-info": "editDetails",
        "click #cancel": "cancelEvent",
        "click #update-info": "updateDetails",
        "click #delete-customer": "deleteCustomer"
    },
    editDetails: function () {
        var edit_template = _.template($('#customer-info-edit-template').html())
        this.$el.find('#customer-info').html(edit_template({ model: this.model }))
    },
    cancelEvent: function () {
        this.render(this.model)
    },
    updateDetails: function (e) {
        this.$el.find("#updateinfo").html("")
        const customer_name = $("#name").val()
        const mobile_number = $("#mob").val()
        const email = $("#email").val()
        const address = $("#address").val()
        var customer = new CustomerModel({
            customer_name, mobile_number, email, address
        })
        var self = this;
        customer.save(null, {
            url: "http://localhost:3060/users/customers/" + this.model.get('customer_id'),
            type: "PATCH",
            headers: { 'auth-token': localStorage.getItem('khata-token') },
            success: async (response) => {
                var view = new ErrorView({ model: { messages: "The details were updated successfully" } })
                await self.render(self.model)
                self.$el.find("#updateinfo").append(view.render().$el)
            },
            error: function (err, response) {
                console.log(response.responseJSON)
                var err = getUIMessage(response.responseJSON.messages)
                var view = new ErrorView({ model: err })
                self.$el.find("#updateinfo").html(view.render().$el)
            }
        })
    },
    deleteCustomer: function () {
        const customer_id = this.model.get('customer_id');
        this.model.set({ id: customer_id });
        this.model.destroy({
            url: "http://localhost:3060/users/customers/" + customer_id,
            headers: { 'auth-token': localStorage.getItem('khata-token') },
            success: function (response) {
                window.location = "#customers"
            },
            error: function (error, response) {
                console.log(response);
            }
        })
    },
    render: async function (data) {
        // console.log(data)
        var self = this
        await data.fetch({
            url: "http://localhost:3060/users/customers/" + data.get('customer_id'),
            headers: { 'auth-token': localStorage.getItem('khata-token') },
            success: response => {
                self.model = new CustomerModel(response.toJSON())
            }
        })

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
