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
