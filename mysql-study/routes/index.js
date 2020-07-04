import {
  getUsers,
  findUser,
  addUser,
  deleteAllUser,
} from "@/operations/user-operation";
import { database } from "@/database/mysql";
import { v4 as uuidv4 } from "uuid";
var express = require("express");
var router = express.Router();
const fs = require("fs");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const getQuery = await database.query(
    "SELECT * FROM express_movie_app.users"
  );

  console.log(getQuery, "getQuery");
  res.render("index", { title: "Express", users: getQuery });
});

// NOTE: delete
router.get("/delete", async function (req, res, next) {
  const email = "monster2jy@gmail.com";
  // DEBUG: userCode로 바꾸기
  const deleteQuery = await database.query(
    `DELETE FROM express_movie_app.users WHERE email="${email}" `
  );
  console.log(deleteQuery, "deleteQuery");
  if (deleteQuery.affectedRows === 1) {
    res.json({ result: 1 });
  } else {
    res.json({ result: 2 });
  }
});

// NOTE: insert
router.get("/insert", async function (req, res, next) {
  const uniqId = uuidv4();
  const reqBody = {
    email: "monster2jy@gmail.com",
    username: "이준영",
    password: "1234",
    userCode: uniqId.replace(/\-/g, ""),
  };

  const insertKeys = Object.keys(reqBody).join(", ");
  const insertValues = Object.values(reqBody)
    .map((i) => `"${i}"`)
    .join(", ");

  const insertQuery = await database
    .query(
      `INSERT INTO express_movie_app.users (${insertKeys}) values (${insertValues})`
    )
    .catch((err) => err);

  if (insertQuery.code === "ER_DUP_ENTRY") {
    res.json({ result: 2, error: insertQuery.errno });
  } else {
    res.json({ result: 1 });
  }
});

// NOTE: getUsers
router.get("/getUser", async function (req, res, next) {
  const getQuery = await database.query(
    "SELECT * FROM express_movie_app.users"
  );
  res.json({ result: 1, data: getQuery });
});

// NOTE: Update
router.get("/update", async function (req, res, next) {
  const email = "monster2jy@gmail.com";
  // DEBUG: userCode로 바꾸기
  const updateQuery = await database.query(
    `UPDATE express_movie_app.users SET username="김준영" WHERE email="${email}"`
  );
  console.log(updateQuery, "updateQuery");
  res.json({ result: 1, data: updateQuery });
});

module.exports = router;

// class Test {
//   constructor(props) {
//     this.sql = null;
//   }
//   setSql(qr) {
//     const config = {
//       ph_agree_m_update: `"UPDATE fm_z_ph_agree_m  SET ph_agree_month = {$data['ph_agree_month']}
//         WHERE ph_agree_m_id = {$data['ph_agree_m_id']}"`,
//       get_ph_agree_m: ` "SELECT * FROM fm_z_ph_agree_m
//         WHERE ph_agree_m_id = {$ph_agree_m_id}
//       "`,
//     };
//     this.sql = config[qr];
//   }

//   query(...query){
//     this.setSql()
//   }
//   async do(...query){
//     const {result,data,error} = await this.query(query);
//     if(data && !error){
//       this.result = {
//         result:1,
//         error:null,
//         data,
//       };
//     }else{
//       this.result = {
//         result:2,
//         error:result.errno,
//       }
//     }
//   }
// }

// console.log(_.map(reqBody,i=>));
// db.query(`insert into showplex.user (email, password, username, phone, verifyNumber, verify) values ("${email}", "${password}", "${username}", "${phone}", "${verifyNumber}", "${verify}")`)

// const dataPosts = await database.query("select * from howto.post");

// await addUser("users", value);
// db.query("select * from howto.post", (err, results) => {
//   console.log([...results], "db");
// });
// db.query("select * from howto.post").then((rows) => {
//   console.log(rows, "rwr");
// });

// ES7 Version
// const getJsonFile = (filePath, encoding = "utf8") =>
//   new Promise((resolve, reject) => {
//     fs.readFile(filePath, encoding, (err, contents) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(contents);
//     });
//   }).then(JSON.parse);
