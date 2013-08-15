define(
    [
        "app/classes/abstract/layout",
        "tpl!../../html/layout.html",
        "app/classes/messenger/message",
    ],
    function (Layout, LayoutTemplate, Message) {
        return Layout.extend({
            tagName: "div",
            className: "j-hello",

            events: {
                'click button.classic': "onClickClassic",
                'click button.bus': "onClickBus"
            },

            template: LayoutTemplate,

            initialize: function() {
                this.router = this.options.router;

                this.listenTo(this.router, 'route:test',   this.onRouteTest);
                this.listenTo(this.router, 'route:params', this.onRouteParams);
                this.listenTo(this.module, 'megaclick',    this.onMegaClick);
            },

            render: function() {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },

            onClickClassic: function() {
                var message = new Message('megaclick', 1, 2, 3);
                this.module.send(message);
            },

            onClickBus: function() {
                var message = new Message('megaclick', 1, 2, 3);
                this.module.sendBus(1000, message);
            },

            onRouteTest: function() {
                this.$el.css({background: 'yellow'});
            },

            onRouteParams: function(params) {
                console.log('params', params);
            },

            onMegaClick: function(message) {
                this.$('.events-hello').append(_.sprintf("<p>%s#%s</p>", message.getId(), message.getName()));
            }
        });
    }
);