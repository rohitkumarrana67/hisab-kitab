define(['jquery', 'underscore', 'backbone',], function ($, _, Backbone) {

    var LoginView = Backbone.View.extend({
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html("LOGIN VIEW");
            return this;
        }
    });

    return LoginView;

});