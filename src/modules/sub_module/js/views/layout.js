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

			render: function() {
				this.$el.html(this.template(this.model.toJSON()));
			},

            onClick: function() {
                this.trigger('button:click', this, 1);
            }
		});
	}
);