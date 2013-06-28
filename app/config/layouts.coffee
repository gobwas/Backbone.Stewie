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
        id: "hello_module"
        render: true
      ]

  hello1:
    path: "src/modules/sub_module/index"
    deps:
      arguments:[
        id: "hello1_module"
        render: false
      ]
###
  index:
    id:  "index_module"
    path: "src/modules/module/index"
    options:
      render: true
    regions:
      ".main": "hello"
      ".secondary": "hello1"
      ".third": ["hello", "hello1", "hello"]
  hello:
    id:  "hello_module"
    path: "src/modules/module/index"
    options:
      render: false
  hello1:
    id:  "hello1_module"
    path: "src/modules/module/index"
    options:
      render: true###
