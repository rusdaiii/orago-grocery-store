import { ACCESS_TOKEN_KEY } from './constants/storageKey';
import { getCookie } from './cookies';

type FetchOptions = {
  isFreshURL?: boolean;
  isFormData?: boolean;
};

type FetchParams = RequestInit & {
  url: string;
  query?: string;
  options?: FetchOptions;
};

const parseURL = (url: string, query?: string) => {
  const urlWithoutQueries = url.split('?');

  const listOfQueries = query;

  const queryString = listOfQueries ? `?${listOfQueries}` : '';

  return `${urlWithoutQueries}${queryString}`;
};

const fetcher = <ResponseBody>({ method = 'GET', ...args }: FetchParams) => {
  const accessToken = getCookie(ACCESS_TOKEN_KEY);

  return new Promise<ResponseBody>(async (resolve, reject) => {
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const finalUrl = args?.options?.isFreshURL
      ? args?.url
      : `${backendUrl}${args?.url}`;

    const response = await fetch(parseURL(finalUrl, args?.query), {
      method,
      headers: <HeadersInit>{
        authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        ...(!args?.options?.isFormData && {
          'Content-Type': 'application/json',
        }),
        ...args?.headers,
      },
      cache: args?.cache ?? args?.next ? undefined : 'no-store',
      ...args,
    });

    const data = await response.json();

    if (!response.ok) {
      reject(data);
    }

    resolve(data as ResponseBody);
  });
};

export default fetcher;
