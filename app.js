var http = require('http'),
    fs = require('fs'),
    url = require('url');
var app = module.exports = http.createServer(function(req, res) {
        var pathname = url.parse(req.url).pathname;
        var realPath = __dirname + '/' + pathname;
        console.log(req.url);
        console.log(req.method);
        console.log(req.headers);
        if (pathname == '/favicon.ico') {
            return;
        } else if (pathname == '/index' || pathname == '/') {
            //gotoIndex(res);
        } else if (pathname == '/cookie.html'){
	    console.log(req.headers.cookie);
    	    res.writeHead(200, {'Content-Type':'text/html'});
   	    res.end("hacked you");
        }
});

if (!module.parent) {
    app.listen(80);
//    console.log("Server listening on port %d in %s mode", http.address().port, http.settings.env);
}

function gotoPhp(res) {
    var readPath = __dirname + '/' + url.parse('cookie.html').pathname;
    console.log(readPath);
    var indexPage = fs.readFileSync(readPath);
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(indexPage);
}

function gotoIndex(res) {
        var readPath = __dirname + '/' + url.parse('index.html').pathname;
        var indexPage = fs.readFileSync(readPath);
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(indexPage);
}

function gotoDefault(res) {
        res.writeHead(404, {'Content-Type':'text/plain'});
        res.end('I think you got some problems. You want a help? Hehe, no way.');
}

function dealWithStatic(pathname, realPath, res) {
    fs.exists(realPath, function (exists) {
        if (!exists) {
            gotoDefault(res);
        } else {
            var pointPosition = pathname.lastIndexOf('.'),
                mmieString = pathname.substring(pointPosition + 1),
                mmieType;
            switch (mmieString) {
                case 'css' :
                    mmieType = 'text/css';
                    break;
                case 'png':
                    mmieType = 'image/png';
                    break;
                case 'js':
                    mmieType = 'text/javascript';
                    break;
		case 'mp3':
		    mmieType = 'audio/mp3';
		    break;
                default:
                    mmieType = 'text/plain';
                    break;
            }
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    res.writeHead(500, {'Content-Type':'text/plain'});
                    res.end(err);
                } else {
                    res.writeHead(200, {'Content-Type':mmieType});
                    res.write(file, "binary");
                    res.end();
                }
            });
        }
    });
}
