var SummaryView = Backbone.View.extend({
    template : _.template($('#summary-template').html()),
    initialize : function (data) {
        this.model = data.model
        this.render()
    },
    render : function () {
        this.$el.html(this.template(this.model))
        return this
    }
});