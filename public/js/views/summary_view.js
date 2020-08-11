var SummaryView = Backbone.View.extend({
    collection: transaction_collection,
    template: _.template($('#summary-template').html()),
    initialize: function (data) {
        this.model = data.model
        this.render()
    },
    events: {
        "click #edit": "editdetails",
        "click #cancel": "cancelevent"
    },
    editdetails: function () {
        $(".editbutton").addClass("collapse")
        $(".morebutton").addClass("show")
        $("input").removeAttr('disabled')
        $("textarea").removeAttr('disabled')
    },
    cancelevent: function () {
        this.render()
    },
    render: function () {
        this.$el.html(this.template({ model: this.model }))
        var customer_id = this.model.get('customer_id');
        var $transactions_list = $("#transactions");
        this.collection.fetch({
            url: "http://localhost:3060/users/customer/" + customer_id + "/transactions",
            headers: { 'auth-token': localStorage.getItem('khata-token') },
            success: function (response) {
                response.each(data => {
                    $transactions_list.append((new TransactionView({ model: data })).render().$el);
                });
            },
            error: function (err, response) {
                console.log(response);
            }

        })
    }
});