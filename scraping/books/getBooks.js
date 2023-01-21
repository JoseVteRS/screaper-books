import { TOKEN } from "../../utils/token.js";

/**
 * @param {Object} params
 * @param {string} params.genre
 * @param {number} params.limit
 * @param {number} params.page
 * @returns {Promise<Object>}
 */
export async function getBooks(params) {
  const response = await fetch(
    `https://api.alibrate.com/v1/books?genre=${params.genre}&limit=${params.limit}&page=${params.page}`,
    { headers: { Authorization: `Bearer ${params.token}` } }
  );

  return response.json();
}
