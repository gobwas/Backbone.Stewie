define

# Application config
# ------------------

  view:
    el: "#main"
  router:
    routes:
      ## Routes map as route => name of route
      "":              "index"
      "index*any":     "index"
      "hello*any":     "hello"
      "exception*any": "exception"
