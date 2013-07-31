define
  ## TODO возможно убрать вообще диспетчер отсюда и сделать его одинаковым для всех
  event_dispatcher:
    path: "app/classes/base/event-dispatcher"
    deps:
      arguments: [
        test: 123
      ]

  ## -------------------
  ## Pages
  ## -------------------

  index:
    path: "src/modules/index/index"
    deps:
      arguments: [
        id: "index_module"
        dispatcher: "@event_dispatcher"
        route: "index"
        regions:
          ".main": "@hello"
      ]

  ## -------------------
  ## Sub modules
  ## -------------------

  hello:
    path: "src/modules/hello/hello"
    deps:
      arguments: [
        id: "hello"
        route: "index/hello"
        regions:
          ".sub": "@hello1"
        dispatcher: "@event_dispatcher"
      ]

  hello1:
    path: "src/modules/hello1/hello1"
    deps:
      arguments: [
        id: "hello1"
        route: "index/hello/hello1"
        dispatcher: "@event_dispatcher"
      ]