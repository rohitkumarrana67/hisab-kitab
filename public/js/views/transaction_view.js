var TransactionView = Backbone.View.extend({
    template: _.template($('#transaction-template').html()),
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html(this.template({ model: this.model }));
        return this;
    }
})