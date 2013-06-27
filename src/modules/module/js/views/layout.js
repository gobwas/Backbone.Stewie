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

			render: function() {
				this.$el.html(this.template(this.model.toJSON()));
			}
		});
	}
);