define
  index:
    path: "src/modules/module/index"
    deps:
      arguments:[
        id: "index_module"
        regions:
          ".main": "@hello"
          ".secondary": "@hello1"
          ".third": ["@hello", "@hello1", "@hello"]
        render: true
      ]

  hello:
    path: "src/modules/sub_module/index"
    deps:
      arguments:[
        id: "hello"
        render: true
      ]

  hello1:
    path: "src/modules/sub_module/index"
    deps:
      arguments:[
        id: "hello1"
        render: false
      ]