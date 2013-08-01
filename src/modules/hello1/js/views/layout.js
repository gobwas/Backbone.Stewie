define(
	[
		"app/classes/abstract/layout",
		"tpl!../../html/layout.html",
	],
	function (Layout, LayoutTemplate) {
		return Layout.extend({
			tagName: "div",

            events: {
                'click button': "onClick"
            },

			className: "sub--layout",

			template: LayoutTemplate,

            initialize: function() {
                this.listenTo(this.router, 'route:test', this.onRouteTest);
                this.listenTo(this.module, 'megaclick',  this.onMegaclick);
            },

			render: function() {
				this.$el.html(this.template(this.model.toJSON()));
			},

            onClick: function() {

            },

            onRouteTest: function() {
                this.$el.css({background: 'red'});
            },

            onMegaclick: function(message) {
                this.$('.events-hello1').append(_.sprintf("<p>%s#%s</p>", message.getId(), message.getName()));
            }
		});
	}
);