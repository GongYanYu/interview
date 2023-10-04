const fs = require("fs");

function appendFileSync() {
  fs.appendFileSync("3.txt", " world");
  let data = fs.readFileSync("3.txt", "utf8");
}

function appendFile() {
  fs.appendFile("3.txt", " world", err => {
    if (!err) {
      fs.readFile("3.txt", "utf8", (err, data) => {
        console.log(data); // Hello world
      });
    }
  });
}
function copyFileSync() {
  fs.copyFileSync("3.txt", "4.txt");
  let data = fs.readFileSync("4.txt", "utf8");

  console.log(data); // Hello world
}

function buffer() {
  const buffer = Buffer.from("你好","utf-8");
  console.log(buffer);
// <Buffer e4 bd a0 e5 a5 bd>
  const str = buffer.toString("ascii");
  console.log(str);
// d= e%=
}

buffer()
