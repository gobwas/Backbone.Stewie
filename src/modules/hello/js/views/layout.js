define(
    [
        "app/classes/abstract/layout",
        "tpl!../../html/layout.html",
        "app/classes/messenger/message",
    ],
    function (Layout, LayoutTemplate, Message) {
        return Layout.extend({
            tagName: "div",

            events: {
                'click button': "onClick"
            },

            className: "sub--layout",

            template: LayoutTemplate,

            initialize: function() {
                this.router = this.options.router;

                this.listenTo(this.router, 'route:test',   this.onRouteTest);
                this.listenTo(this.router, 'route:params', this.onRouteParams);
            },

            render: function() {
                this.$el.html(this.template(this.model.toJSON()));
            },

            onClick: function() {
                var message = new Message('megaclick', 1, 2, 3);
                this.module.send(message);
            },

            onRouteTest: function() {
                this.$el.css({background: 'yellow'});
            },

            onRouteParams: function(params) {
                console.log('params', params);
            }
        });
    }
);