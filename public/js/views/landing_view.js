define(['jquery', 'underscore', 'backbone', '../router'], function ($, _, Backbone, AppRouter) {
    var router = new AppRouter();
    var LandingView = Backbone.View.extend({

        events: {
            'click': 'onClick',
        },
        onClick: function (e) {
            var $li = $(e.target);
            router.navigate($li.attr("data-url"), { trigger: true });
        },


    });

    return LandingView;
})

