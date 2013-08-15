define

# Application config
# ------------------

  type: "classic"

  view:
    el: "#main"

  history:
    pushState: false

  # Routes to application acts.
  #
  # It is a map of route => module
  routes:
#    "hello*any": "hello"
    "":     "index"
    "page": "index"