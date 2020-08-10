var SummaryView = Backbone.View.extend({
    template : _.template($('#summary-template').html()),
    initialize : function (data) {
        this.model = data.model
        this.render()
    },
    events:{
        "click #edit":"editdetails",
        "click #cancel":"cancelevent"
    },
    editdetails: function(){
        $(".editbutton").addClass("collapse")
        $(".morebutton").addClass("show")
        $("input").removeAttr('disabled')
        $("textarea").removeAttr('disabled')
    },
    cancelevent:function(){
        this.render()
    },
    render : function () {
        this.$el.html(this.template({model : this.model}))
        return this
    }
});