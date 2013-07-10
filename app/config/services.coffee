define [
  "app/classes/abstract/dm"
  "app/config/layouts"
], (dm, layouts) ->

  # Properties
  # ----------

  properties:
    test: 1234


  # Services
  # --------

  services:

    "module-manager":
      path: "app/services/module-manager"
      deps:
        calls:
          setConfig: [dm.escape(layouts)]




      # arguments: ["%some_property"]
      # calls:
      #  setSome: ["%some_property"]
      #  setProp: ["%some_property"]
      #properties:
      #  _some: "@some_module"
