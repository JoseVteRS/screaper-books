import { writeDBFile } from "../db/index.js";
import { logError, logInfo, logSuccess } from "./log.js";

export function dbNameFormatted(dbName) {
  return dbName.replaceAll(/[' ', +]/g, "_").toLowerCase();
}

export async function scraper(params) {
  const response = await fetch(
    `https://api.alibrate.com/v1/books?genre=${params.genre}&limit=${params.limit}&page=${params.page}`,
    { headers: { Authorization: `Bearer ${params.token}` } }
  );
  const data = await response.json();
  return data;
}

export async function scrapeAndSave({ genre, limit, page, token }) {
  const start = performance.now();

  try {
    logInfo(`Scraping [${genre}]`);
    const data = await scraper({ genre, limit, page, token });

    logSuccess(`Scraped [${genre}] in ${performance.now() - start}ms`);

    logInfo(`Writing [${genre}] to file`);
    await writeDBFile(genre, data);
    logSuccess(`Wrote [${genre}] to file`);
  } catch (e) {
    logError(`Error scraping [${genre}]: ${e.message}`);
    logError(e);
  } finally {
    const end = performance.now();
    const time = (end - start) / 1000;
    logInfo(`Scraping [${genre}] scraped ${time} seconds`);
  }
}
