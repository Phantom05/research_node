const fs = require("fs");
export const users = getJsonFile("./db/user.json");

const getJsonFile = (filePath, encoding = "utf8") =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, encoding, (err, contents) => {
      if (err) {
        return reject(err);
      }
      resolve(contents);
    });
  }).then(JSON.parse);
