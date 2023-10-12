// Using the stream to handle the LARGE FILES
const fs = require("fs");
const path = require("path");

const readStream = fs.createReadStream(
  path.join(__dirname, "files", "lorem.txt"),
  "utf8"
);

const writeStream = fs.createWriteStream(
  path.join(__dirname, "files", "new-lorem.txt")
);

// listen the data comes from the stream
// readStream.on("data", (dataChunk) => {
//   writeStream.write(dataChunk);
// });


// use the pipe instead of listener, pipe is more efficient
readStream.pipe(writeStream)