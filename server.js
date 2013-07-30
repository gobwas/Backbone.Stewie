var connect = require('connect');

var app = connect()
	.use(connect.favicon())
	.use(connect.logger('dev'))
	.use(connect.static(__dirname))
	.listen(8000);