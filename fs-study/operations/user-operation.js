import db from "~/database/user-db.json";
import { getJsonFile, insertData, deleteAllData } from "~/database/lib/utils";
import _ from "lodash";

const dbPath = "./database/user-db.json";

export const getUsers = () => db.users;
export const findUser = async (id) =>
  _.find(db.users, (item) => item.id === id);
export const addUser = async (table, data) =>
  await insertData(dbPath, table, data);
export const deleteAllUser = async (table) =>
  await deleteAllData(dbPath, table);
