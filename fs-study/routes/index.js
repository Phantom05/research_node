import {
  getUsers,
  findUser,
  addUser,
  deleteAllUser,
} from "@/operations/user-operation";
import { database } from "@/database/mysql";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import express from "express";
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const getQuery = await database.query(
    "SELECT * FROM express_movie_app.users"
  );

  console.log(getQuery, "getQuery");
  res.render("index", { title: "Express", users: getQuery });
});

// NOTE: delete
router.post("/delete", async function (req, res, next) {
  const email = "monster2jy@gmail.com";
  // DEBUG: userCode로 바꾸기
  const userCode = req.body.userCode;

  console.log(userCode, "userCode");
  const deleteQuery = await database.query(
    `DELETE FROM express_movie_app.users WHERE userCode="${userCode}" `
  );
  console.log(deleteQuery, "deleteQuery");
  if (deleteQuery.affectedRows === 1) {
    res.json({ result: 1 });
  } else {
    res.json({ result: 2 });
  }
});

// NOTE: insert
router.post("/insert", async function (req, res, next) {
  const uniqId = uuidv4();
  const reqBody = {
    email: "monster2jy@gmail.com",
    username: "이준영",
    password: "1234",
    userCode: uniqId.replace(/\-/g, ""),
  };

  const { email, password, username } = req.body;
  const insertFormat = {
    email,
    password,
    username,
    userCode: uniqId.replace(/\-/g, ""),
  };

  const insertKeys = Object.keys(insertFormat).join(", ");
  const insertValues = Object.values(insertFormat)
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
router.post("/update", async function (req, res, next) {
  const email = "monster2jy@gmail.com";
  console.log(req.body);

  console.log(_.omit(req.body, ["userCode"]));

  const updateFormat = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  };
  const userCode = req.body.userCode;
  const updateString = _.reduce(
    Object.entries(updateFormat),
    (acc, [key, value]) => {
      console.log(key, value, "key, value");
      if (value.length !== 0) {
        acc += `${key}="${value}", `;
      }
      return acc;
    },
    ""
  );
  console.log(updateString, "updateString");

  const updateQuery = await database.query(
    `UPDATE express_movie_app.users SET ${removeLastComma(
      updateString
    )} WHERE userCode="${userCode}"`
  );
  res.json({ result: 1, data: updateQuery });
});

module.exports = router;

function removeLastComma(strng) {
  var n = strng.lastIndexOf(",");
  var a = strng.substring(0, n);
  return a;
}
