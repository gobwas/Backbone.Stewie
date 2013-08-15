define(
	[
		"app/classes/abstract/dm",
	],
	function (AbstractDependencyManager) {
		var DM = AbstractDependencyManager.extend({
			/**
			 * Имя экземпляра.
			 */
			name: "Dependency Manager"
		});

		return new DM();
	}
);