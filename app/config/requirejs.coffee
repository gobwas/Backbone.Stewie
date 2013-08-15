require.config
  baseUrl: "/"
  deps: [
    "vendor/jam/require.config",
    "app/main",
  ]
  map:
    "*":
      "underscore": "lodash"
  paths:
    "application": "app/classes/application/application"
    "dm":          "app/classes/dm/dm"
  shim:
    underscore:
      exports: "_"