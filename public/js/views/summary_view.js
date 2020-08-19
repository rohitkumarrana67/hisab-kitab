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
                var err = self.getUIMessage(response.responseJSON.messages)
                var view = new ErrorView({ model: err })
                self.$el.find("#updateinfo").html(view.render().$el)
            }
        })
    },
    deleteCustomer: function () {
        var customer = new CustomerModel({
        });
        const customer_id = this.model.get('customer_id');
        customer.destroy({
            url: "http://localhost:3060/users/customers/" + customer_id,
            headers: { 'auth-token': localStorage.getItem('khata-token') },
            success: function (response) {
                console.log(response);
            },
            error: function (error, response) {
                console.log(response);
            }
        })
    },
    getUIMessage: function (message) {
        if (message.includes("E11000 duplicate key error collection: khata_book.customers index: email_1 dup key")) {
            return { messages: "Email ID already in use" }
        }
        else if (message.includes("Cast to Number failed for value")) {
            return { messages: "Mobile number is not valid" }
        }
        else if (message == "'email' is not allowed to be empty") {
            return { messages: "Email cannot be blank" }
        }
        else {
            return { messages: message }
        }
    },
    render: async function (data) {
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
