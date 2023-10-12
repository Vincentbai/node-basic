const fs = require("fs");
const path = require("path");

const fsPromises = require("fs").promises;

// . 这个点居然是项目的根路径
// 使用path.join(__dirname, 'files', 'starter.txt')的原因是windows的文件分隔符是正斜杠，linux的文件分隔符是反斜杠，如果写死了跨系统会报错
// fs.readFile('./02TUT/files/starter1.txt', 'utf-8', (err, data) =>{
fs.readFile(
  path.join(__dirname, "files", "starter.txt"),
  "utf8",
  (err, data) => {
    if (err) throw err;
    console.log(data); // if not 'utf-8', the output is Buffer
    // console.log(data.toString()) // the output is Buffer
  }
);

fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "Nice to meet you!",
  (err) => {
    if (err) throw err;
    console.log("Write complete!");

    fs.appendFile(
      path.join(__dirname, "files", "reply.txt"),
      "\n\nNice to meet you, too!",
      (err) => {
        if (err) throw err;
        console.log("Append complete!");

        fs.rename(
          path.join(__dirname, "files", "reply.txt"),
          path.join(__dirname, "files", "newReply.txt"),
          (err) => {
            if (err) throw err;
            console.log("Rename complete!");
          }
        );
      }
    );
  }
);

console.log("Hello..."); // 如果不加下面的代码，当上面报错是Hello不会被输出

process.on("uncaughtException", (err) => {
  console.error(`There aws an uncaught error: ${err}`);
  process.exit(1);
});

// fs with promises
const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf-8"
    );
    console.log("🚀 ~ file: index.js:60 ~ fileOps ~ data:", data);

    await fsPromises.unlink(path.join(__dirname, "files", "promiseWrite.txt"));

    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );

    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\n\nNice to meet you."
    );

    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseComplete.txt")
    );

    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseComplete.txt"),
      "utf-8"
    );

    console.log("🚀 ~ file: index.js:78 ~ fileOps ~ newData:", newData);
  } catch (err) {
    console.log(err);
  }
};

fileOps();
