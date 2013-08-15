define(
	[
		"app/classes/abstract/view",
	],
	function (View) {

		var AbstractLayout = View.extend({
            /**
             * Returns DOM query string for self element.
             *
             * @returns {string}
             */
            getSelector: function() {
                return _.vsprintf("%s.%s", _.values(_.pick(this, 'tagName', 'className')));
            }
		});

		return AbstractLayout;
	}
);