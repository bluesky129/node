var http = require("http");
var url = require("url");
function start(route, handle){
	function onRequest(request,response){
		var pathname = url.parse(request.url).pathname;
		var postData = "";
		console.log("Request for "+pathname+" received!");
		// request.setEncoding("utf8");
		// request.addListener("data",function(postDataChunk){
		// 	postData+=postDataChunk;
		// 	console.log("Request post data chunk "+postDataChunk+" !");
		// });
		// request.addListener("end",function(){
		// 	route(handle, pathname, response, postData);
		// });
		route(handle, pathname, response, request);
		// response.writeHead(200,{"Content-Type":"text/plain"});
		// response.write("Hello World!")
		// response.end();
	}
	http.createServer(onRequest).listen(888);
	console.log("Server started at port 888 .");
}
exports.start = start;