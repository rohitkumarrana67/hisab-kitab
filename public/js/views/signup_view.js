define(['jquery', 'underscore', 'backbone',], function ($, _, Backbone) {

    var SignupView = Backbone.View.extend({
        template: _.template($('#signup-template').html()),
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });

    return SignupView;

});