var exec = require("child_process").exec;
var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response, postdata) {
    console.log("Requset handler 'start' was called.");
    // exec("ls -lah", function (error, stdout, stderr) {
    // 	response.writeHead(200, {"Content-Type": "text/plain"});
    // 	response.write(stdout);
    // 	response.end();
    // });
    // exec("find /",
    // 	{ timeout: 10000, maxBuffer: 20000*1024 },
    // 	function (error, stdout, stderr) {
    // 		response.writeHead(200, {"Content-Type": "text/plain"});
    // 		response.write(stdout);
    // 		response.end();
    // 	});

    // var body = '<html>'+
    // '<head>'+
    // '<meta http-equiv="Content-Type" content="text/html; '+
    // 'charset=UTF-8" />'+
    // '</head>'+
    // '<body>'+
    // '<form action="/upload" method="post">'+
    // '<textarea name="text" rows="20" cols="60"></textarea>'+
    // '<input type="submit" value="Submit text" />'+
    // '</form>'+
    // '</body>'+
    // '</html>';

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" ' +
        'content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="file" name="upload">' +
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';


    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(body);
    response.end();

}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");
    var form = formidable.IncomingForm();
    form.uploadDir = "tmp";
    console.log("About form parse.");
    form.parse(request, function(error, fields, files) {
        console.log("form parse done.");
        fs.renameSync(files.upload.path, "./tmp/test.jpg");
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });


}

function show(response, postdata) {
    console.log("Request handler 'show' was called.");
    fs.readFile("./tmp/test.jpg", "binary", function(error, file) {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.write(file, "binary");
            response.end();
        }
    });


}

function getip(response, request) {
    var ip = request.headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress;

    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write(ip);
    response.end();
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.getip = getip;
