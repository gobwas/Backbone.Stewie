define
  event_dispatcher:
    path: "app/classes/base/event-dispatcher"
    deps:
      arguments: [
        test: 123
      ]

  index:
    path: "src/modules/module/index"
    deps:
      arguments: [
        id: "index_module"
        dispatcher: "@event_dispatcher"
        regions:
          ".main":      "@hello"
          ".secondary": "@hello1"
          ".third":     ["@hello", "@hello1", "@hello"]
      ]

  hello:
    path: "src/modules/sub_module/index"
    deps:
      arguments: [
        id: "hello"
        dispatcher: "@event_dispatcher"
      ]

  hello1:
    path: "src/modules/sub_module/index"
    deps:
      arguments: [
        id: "hello1"
        dispatcher: "@event_dispatcher"
      ]