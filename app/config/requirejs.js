// Generated by CoffeeScript 1.6.3
(function() {
  require.config({
    baseUrl: "",
    deps: ["vendor/jam/require.config", "app/bootstrap"],
    map: {
      "*": {
        "underscore": "lodash"
      }
    },
    paths: {
      "application": "app/application",
      "dm": "app/dm"
    },
    shim: {
      underscore: {
        exports: "_"
      }
    }
  });

}).call(this);
