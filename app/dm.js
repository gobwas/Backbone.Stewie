define(
	[
		"app/classes/abstract/dm",
	],
	function (AbstractDependencyManager) {
		var DM = AbstractDependencyManager.extend({
			/**
			 * Имя экземпляра.
			 */
			name: "Service Manager"
		});

		return new DM();
	}
);