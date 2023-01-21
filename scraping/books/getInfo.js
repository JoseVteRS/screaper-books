import { writeFile } from "node:fs/promises";

/**
 *
 * @param {string} baseUrl Url base de la API
 * @param {string} endpoint endpoint de la api
 * @param {string} token Token de autotentificación
 * @param {{genre, limit, page}} params Parámetros de la api
 * @returns
 */
export async function getBooksByGenre(baseUrl, endpoint, token, params) {
  const response = await fetch(
    `${baseUrl}${endpoint}?genre=${params.genre}&limit=${params.limit}&page=${params.page}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.json();
}

/**
 *
 * @param {string} path Ruta raiz del archivo
 * @param {string} filename Nombre del archivo
 * @param {{total: number, limit: number, page: number, pages: number}} dataInfo Información extra
 */
export function getInfo(path, filename, dataInfo) {
  writeFile(
    `${path}/${filename}.json`,
    JSON.stringify(
      {
        total: dataInfo.total,
        limit: dataInfo.limit,
        page: dataInfo.page,
        pages: dataInfo.pages,
      },
      null,
      2
    ),
    "utf-8"
  );
