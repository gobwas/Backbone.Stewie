require.config
  baseUrl: ""
  deps: [
    "vendor/jam/require.config",
    "app/bootstrap"
  ]
  paths:
    "application": "app/application"
    "dm": "app/dm"
  shim:
    underscore:
      exports: "_"