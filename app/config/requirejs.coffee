require.config
  baseUrl: ""
  deps: [
    "vendor/jam/require.config",
    "app/bootstrap"
  ]
  map:
    "*":
      "underscore": "lodash"
  paths:
    "application": "app/application"
    "dm": "app/dm"
  shim:
    underscore:
      exports: "_"