var server = require("./server");
var router = require("./route");
var requestHandlers = require("./requestHandlers");

var handler = {}
handler["/"] = requestHandlers.start;
handler["/start"]== requestHandlers.start;
handler["/upload"]  = requestHandlers.upload;
handler["/show"]  = requestHandlers.show;
handler["/getip"]  = requestHandlers.getip;
server.start(router.route, handler);