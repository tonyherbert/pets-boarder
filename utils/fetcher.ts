import { getUserId } from "./auth";

type FetcherOptions<T> = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  headers?: HeadersInit;
};

async function fetcher<T>(options: FetcherOptions<T>): Promise<T | undefined> {
  const userId = await getUserId();
  try {
    const response = await fetch(options.url, {
      method: options.method || 'GET',
      body: options.data ? JSON.stringify(options.data) : undefined,
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': userId || '',
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error instanceof Error ? error.message : String(error));
    return undefined;
  }
}

export default fetcher;
