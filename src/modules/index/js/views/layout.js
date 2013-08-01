define(
	[
		"app/classes/abstract/layout",
		"tpl!../../html/layout.html",
	],
	function (Layout, LayoutTemplate) {
		return Layout.extend({
			tagName: "div",

			className: "template-layout",

			template: LayoutTemplate,

            initialize: function() {
                this.listenTo(this.router, 'route:test', this.onRouteTest);
                this.listenTo(this.module, 'megaclick',  this.onMegaClick);
            },

			render: function() {
				this.$el.html(this.template(this.model.toJSON()));
			},

            onRouteTest: function() {
                this.$el.css('background', 'green');
            },

            onMegaClick: function() {
                this.$('.events-index').append('<p>megaclick</p>');
            }
		});
	}
);