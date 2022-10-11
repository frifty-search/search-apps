const BASE_URL = "https://f741-2405-201-a00b-6081-58ed-892c-fee2-d89f.ngrok.io";
const id = "632b660901da326117213bf4";

export type Apps = {
  appId: number;
  appName: string;
  appVersion: string;
  data: any;
  credits: {
    developer: [
      {
        name: string;
        url: string;
      }
    ];
    maintainer: [
      {
        name: string;
        url: string;
      }
    ];
  };
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

export async function getUsecaseDataFromServer(
  id: number,
  query: any
): Promise<any> {
  const url = new URL(`${BASE_URL}/usecases/${id}`);
  Object.keys(query).forEach((key) => url.searchParams.append(key, query[key]));

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    return null;
  }
  const { data } = await response.json();
  return data;
}
