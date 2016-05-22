var file = require('./info');

var path = require('path');
var md5 = require('md5');
var fs = require('fs');

var c = "";
for(var i=1;i<=file.chunks;i++){
	c += fs.readFileSync(i+".txt");
}
var hash = md5(c);
if(hash != file.piece){
	console.log(hash, file.piece)
	return console.log("hash mismatch");
}
var b = new Buffer(c, 'base64')

fs.writeFileSync(file.name, b);