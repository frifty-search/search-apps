const BASE_URL = import.meta.env.VITE_API_URL;
const id = import.meta.env.VITE_API_ID;

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
