require(
    [
        "jquery",
        "lodash",
        "underscore.string",
        "backbone"
    ],

    function($, _, _s, Backbone) {

        _.mixin(_s.exports());
        _.str = _s;

        require(
            [
                "src/config/application",
                "app/config/services",
                "app/classes/application/application",
                "dm",
                //"moment",
            ],

            function(applicationConfig, dmConfig, application, DM) {
                var initOptions = {
                    root: _.trim(Backbone.history.location.pathname, "/")
                };

                DM.setConfig(dmConfig.services);
                DM.setProperties(dmConfig.properties);

                application.setConfig(applicationConfig);
                application.init(initOptions);
            }
        )
    }
);