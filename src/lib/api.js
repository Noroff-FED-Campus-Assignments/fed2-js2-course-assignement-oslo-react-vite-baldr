import { API_URL } from "./constants";

export const apiKey = localStorage.getItem("access_token")
/**
 * Helper function to add the
 * @param {Object} options - HTTP header options
 * @returns {Object} - HTTP header options with Authorization header
 */
function updateOptions(options) {
  const update = { ...options };

  if (localStorage.getItem("access_token")) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${apiKey}`,
    };
  }

  return update;
}

/**
 * Wrapper around fetch to add Authorization header
 * @returns {Promise} - fetch promise
 */
export default function fetcher(url, options) {
  return fetch(url, updateOptions(options));
}

/**
 * Fetch all posts with comments, reactions and the author
 * @returns {Object | Error} - A list of posts
 */
export async function fetchAllPosts() {
  const url = new URL(`${API_URL}/posts`);

  url.searchParams.append("_author", "true");
  url.searchParams.append("_comments", "true");
  url.searchParams.append("_reactions", "true");

  try {
    const response = await fetcher(url.href);

    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function login({ username, password }) {

  try {
    const response = await fetch.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    return error;
  }

}