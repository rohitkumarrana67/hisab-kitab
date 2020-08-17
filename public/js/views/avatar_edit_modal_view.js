var AvatarUpdateModalView = Backbone.View.extend({
    className: "modal",
    attributes: {
        id: "avatar-update-modal",
        tabindex: "-1",
        role: "dialog"
    },
    events: {
        "click #close": 'removeFromDOM',
        "click #upload-avatar":"uploadAvatar"
    },
    uploadAvatar:function(){
         const img=$('#avatar').val();
         console.log(img);
    },
    removeFromDOM: function () {
        $('#avatar-update-modal').remove()
    },
    template: _.template($('#avatar-update-modal-template').html()),
    initialize: function () {
    },
    render: function () {
        this.$el.html(this.template())
    }
})
