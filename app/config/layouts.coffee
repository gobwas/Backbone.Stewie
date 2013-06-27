define
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
      render: true