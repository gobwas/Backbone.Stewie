var jam = {
    "packages": [
        {
            "name": "backbone",
            "location": "vendor/jam/backbone",
            "main": "backbone.js"
        },
        {
            "name": "jquery",
            "location": "vendor/jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "jquery-ui-core",
            "location": "vendor/jam/jquery-ui-core",
            "main": "jquery-ui-1.10.2.custom.js"
        },
        {
            "name": "moment",
            "location": "vendor/jam/moment",
            "main": "moment.js"
        },
        {
            "name": "underscore",
            "location": "vendor/jam/underscore",
            "main": "underscore.js"
        },
        {
            "name": "underscore.string",
            "location": "vendor/jam/underscore.string",
            "main": "./lib/underscore.string"
        }
    ],
    "version": "0.2.17",
    "shim": {
        "backbone": {
            "deps": [
                "underscore",
                "jquery"
            ],
            "exports": "Backbone"
        },
        "jquery-ui-core": {
            "deps": [
                "jquery"
            ]
        }
    }
};

if (typeof require !== "undefined" && require.config) {
    require.config({
    "packages": [
        {
            "name": "backbone",
            "location": "vendor/jam/backbone",
            "main": "backbone.js"
        },
        {
            "name": "jquery",
            "location": "vendor/jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "jquery-ui-core",
            "location": "vendor/jam/jquery-ui-core",
            "main": "jquery-ui-1.10.2.custom.js"
        },
        {
            "name": "moment",
            "location": "vendor/jam/moment",
            "main": "moment.js"
        },
        {
            "name": "underscore",
            "location": "vendor/jam/underscore",
            "main": "underscore.js"
        },
        {
            "name": "underscore.string",
            "location": "vendor/jam/underscore.string",
            "main": "./lib/underscore.string"
        }
    ],
    "shim": {
        "backbone": {
            "deps": [
                "underscore",
                "jquery"
            ],
            "exports": "Backbone"
        },
        "jquery-ui-core": {
            "deps": [
                "jquery"
            ]
        }
    }
});
}
else {
    var require = {
    "packages": [
        {
            "name": "backbone",
            "location": "vendor/jam/backbone",
            "main": "backbone.js"
        },
        {
            "name": "jquery",
            "location": "vendor/jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "jquery-ui-core",
            "location": "vendor/jam/jquery-ui-core",
            "main": "jquery-ui-1.10.2.custom.js"
        },
        {
            "name": "moment",
            "location": "vendor/jam/moment",
            "main": "moment.js"
        },
        {
            "name": "underscore",
            "location": "vendor/jam/underscore",
            "main": "underscore.js"
        },
        {
            "name": "underscore.string",
            "location": "vendor/jam/underscore.string",
            "main": "./lib/underscore.string"
        }
    ],
    "shim": {
        "backbone": {
            "deps": [
                "underscore",
                "jquery"
            ],
            "exports": "Backbone"
        },
        "jquery-ui-core": {
            "deps": [
                "jquery"
            ]
        }
    }
};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}