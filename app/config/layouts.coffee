define
  event_dispatcher:
    path: "app/classes/base/event-dispatcher"
    deps:
      arguments: [
        test: 123
      ]

  index:
    path: "src/modules/index/index"
    deps:
      arguments: [
        id: "index_module"
        dispatcher: "@event_dispatcher"
        route: "index"
        regions:
          ".main":      "@hello"
          ".secondary": "@hello1"
          ".third":     ["@hello", "@hello1", "@hello"]
      ]

  hello:
    path: "src/modules/hello/hello"
    deps:
      arguments: [
        id: "hello"
        route: "index/hello"
        dispatcher: "@event_dispatcher"
      ]

  hello1:
    path: "src/modules/hello/hello"
    deps:
      arguments: [
        id: "hello1"
        route: "index/hello1"
        dispatcher: "@event_dispatcher"
      ]