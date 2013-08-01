define
  ## TODO возможно убрать вообще диспетчер отсюда и сделать его одинаковым для всех
  messenger:
    path: "app/classes/messenger/messenger"
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
        messenger: "@messenger"
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
        messenger: "@messenger"
      ]

  hello1:
    path: "src/modules/hello1/hello1"
    deps:
      arguments: [
        id: "hello1"
        route: "index/hello/hello1"
        messenger: "@messenger"
      ]