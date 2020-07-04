const fs = require("fs");

export const getJsonFile = (filePath, encoding = "utf8") =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, encoding, (err, contents) => {
      if (err) {
        return reject(err);
      }
      resolve(contents);
    });
  }).then(JSON.parse);

export const insertData = async (
  filePath,
  tableName,
  value,
  encoding = "utf8"
) => {
  const db = await getJsonFile(filePath);
  const mergeTable = db[tableName].concat(value);
  const mergeDatabase = {
    ...db,
    [tableName]: mergeTable,
  };
  await fs.writeFile(filePath, JSON.stringify(mergeDatabase), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
};

export const deleteAllData = async (filePath, tableName, encoding = "utf8") => {
  const db = await getJsonFile(filePath);
  const mergeDatabase = {
    ...db,
    [tableName]: [],
  };
  await fs.writeFile(filePath, JSON.stringify(mergeDatabase), (err) => {
    if (err) throw err;
    console.log("The file has been delete!");
  });
};
