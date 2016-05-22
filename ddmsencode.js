if(process.argv.length == 2){
	return console.log('no file found');
}

var path = require('path');
var md5 = require('md5');
var fs = require('fs');
var file = process.argv.pop();

var file_data = fs.readFileSync(file, {encoding:"base64"});
var hash = md5(file_data);
var dir = hash;
fs.mkdirSync(dir);
var split_size = 1024 * 20;

var chunks = file_data.match(new RegExp('.{1,'+split_size+'}', 'g'));

var suffix = ".txt";
chunks.forEach(function(c, i){
	fs.writeFileSync( dir + "/" +(i+1)+suffix, c);
})

var f = {
	name:file,
	piece:hash,
	bytes:file_data.length,
	chunks:chunks.length
}

var index = fs.readFileSync("./index.json", {encoding:"utf-8"});
index = JSON.parse(index);
index[hash] = f;
fs.writeFileSync(dir + "/info.json", JSON.stringify(f));
fs.writeFileSync("index.json", JSON.stringify(index));