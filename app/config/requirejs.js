// Generated by CoffeeScript 1.6.3
(function() {
  require.config({
    baseUrl: "/",
    deps: ["vendor/jam/require.config", "app/main"],
    map: {
      "*": {
        "underscore": "lodash"
      }
    },
    paths: {
      "application": "app/classes/application/application",
      "dm": "app/classes/dm/dm"
    },
    shim: {
      underscore: {
        exports: "_"
      }
    }
  });

}).call(this);

/*
//@ sourceMappingURL=requirejs.map
*/
