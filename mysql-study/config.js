const dotenv = require("dotenv");
let mode_env = process.env.NODE_ENV;
const path_env = `${__dirname}/.env`;
const result = dotenv.config({ path: path_env });

if (result.error) throw result.error;
const { parsed: envs } = result;
process.env.PORT =
  process.env.NODE_ENV === "prod" || process.env.NODE_ENV === "dev"
    ? envs.relase_port
    : envs.port;
module.exports = envs;
