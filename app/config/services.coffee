define [
  "app/config/layouts"
], (layouts) ->
  "module-manager":
    path: "app/services/module-manager"
    options: {}
    deps:
      calls:
        setConfig: [layouts]
      # arguments: ["%some_property"]
      # calls:
      #  setSome: ["%some_property"]
      #  setProp: ["%some_property"]
      #properties:
      #  _some: "@some_module"
