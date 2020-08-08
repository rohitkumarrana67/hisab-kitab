var SummaryView = Backbone.View.extend({
    template : _.template($('#summary-template').html()),
    initialize : function (data) {
        console.log(data.model)
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
        $(".editbutton").removeClass("collapse")
        $(".morebutton").removeClass("show")
        $("input").css('disabled','true')
    },
    render : function () {
        this.$el.html(this.template(this.model))
        return this
    }
});