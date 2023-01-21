import { scrapeAndSave, scraper } from "./utils.js";
import { TOKEN } from "../utils/token.js";
import info from "../db/info_literatura_contemporánea.json" assert { type: "json" };
import books from "../db/literatura_contemporánea.json" assert { type: "json" };
import { logInfo } from "./log.js";
import { writeInfoFile } from "../db/index.js";

const data = {
  genre: process.argv.at(-3),
  page: process.argv.at(-2),
  limit: process.argv.at(-1),
};

const infoBooks = await scraper({
  genre: data.genre,
  limit: data.limit,
  page: data.page,
  token: TOKEN,
});

if (process.argv.at(-4) === "info") {
  await writeInfoFile(data.genre, {
    total: infoBooks.total,
    limit: infoBooks.limit,
    page: infoBooks.page,
    pages: infoBooks.pages,
  });
}

if (process.argv.at(-4) === "books") {
  for (let i = 0; i < info.pages; i++) {
    logInfo(`Scraping page ${i} of ${info.pages}...`);
    logInfo("----------------------------------------");
    await scrapeAndSave({
      genre: data.genre,
      page: i,
      limit: data.limit,
      token: TOKEN,
    });
    logInfo(books.length);
  }
}

// await scrapeAndSave({
//   genre: data.genre,
//   page: data.page,
//   limit: data.limit,
//   token: TOKEN,
// });
