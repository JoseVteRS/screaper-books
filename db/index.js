import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { dbNameFormatted } from "../scraping/utils.js";

const DB_PATH = path.join(process.cwd(), "./db");

export function readDBFile(dbName) {
  return readFile(`${DB_PATH}/${dbName}.json`, "utf-8")
    .then(JSON.parse)
    .catch((e) => {
      if (e.code === "ENOENT") return null;
      throw e;
    });
}

/**
 * @param {string} dbName
 * @param {object} data
 * @param {number} data.total
 * @param {number} data.limit
 * @param {number} data.page
 * @param {number} data.pages
 * @returns {Promise<void>}
 *
 */
export async function writeInfoFile(dbName, data) {
  const nameFormatted = dbNameFormatted(dbName);
  const { total, limit, page, pages } = data;
  writeFile(
    `${DB_PATH}/info_${nameFormatted}.json`,
    JSON.stringify({ total, limit, page, pages }, null, 2),
    "utf-8"
  );
}

export async function writeDBFile(dbName, data) {
  const allBooks = [];
  const nameFormatted = dbNameFormatted(dbName);
  const { docs, total, limit, page, pages } = data;

  console.log(total, limit, page, pages);

  const PREV_BOOKS = await readDBFile(nameFormatted);

  if (PREV_BOOKS) allBooks.push(...PREV_BOOKS, ...docs);
  else allBooks.push(...docs);

  return writeFile(
    `${DB_PATH}/${nameFormatted}.json`,
    JSON.stringify(allBooks, null, 2),
    "utf-8"
  );
}
