const BASE_URL = "https://easy-search-backend.herokuapp.com";
const id = "632b660901da326117213bf4";

export type Apps = {
  appId: number;
  appName: string;
  appVersion: string;
  data: any;
};

export async function fetchSearchAPI(q: string): Promise<Apps> {
  const response = await fetch(`${BASE_URL}/search?q=${q}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${id}`,
    },
  });
  if (!response.ok) {
    throw new Error("Query Not Found!");
  }
  const data = await response.json();
  return data;
}
