import { createUrlWithQuery } from 'utils/createUrlWithQuery';
import { Omit } from 'utils/Omit';

interface ICreateFetchUrlOptions {
  apiUrl: string;
  path: string | string[];
  method?: EHtmlRequestMethods;
  requestData?: Record<string, any>;
  getString?: string;
  apiVersion?: string;
}

export enum EHtmlRequestMethods {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Patch = 'PATCH',
}

interface IFetchOptions extends Omit<ICreateFetchUrlOptions, 'apiUrl'> {
  auth?: boolean;
}

class ConnectionManagerInstanse {
  private createRestFetcher = (apiUrl: string) => async <T>({
    path,
    method = EHtmlRequestMethods.Post,
    requestData = {},
    getString = '',
    auth = true,
  }: IFetchOptions): Promise<T> => {
    const headersOptions: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (auth) {
      const authToken = localStorage.getItem('auth_token');
      headersOptions.Authorization = `Bearer ${authToken}`;
    }

    const headers = new Headers(headersOptions);

    const url = this.createFetchUrl({
      apiUrl,
      path,
      method,
      requestData,
      getString,
    });

    const request = new Request(url, {
      method,
      headers,
      credentials: 'include',
      body: JSON.stringify(requestData),
    });
    try {
      const response = await fetch(request);
      switch (response.status) {
        case 401: {
          // Need auth
          throw Error(String(response.status));
        }
        case 404: {
          if (method === EHtmlRequestMethods.Get) {
            // Not found
            throw Error(String(response.status));
          }
          return response.json();
        }
        case 400: // Bad Requiest - error in response body
        case 201: // Created
        case 200: // Ok
        default:
          return response.json();
      }
    } catch (e) {
      throw new Error('FETCH_FAILED');
    }
  };

  private createFetchUrl({
    apiUrl,
    path,
    method,
    requestData,
    getString = '',
  }: ICreateFetchUrlOptions): string {
    const pathArray = [apiUrl].concat(path);
    let fetchingUrl = pathArray.join('/');
    if (method === EHtmlRequestMethods.Get) {
      fetchingUrl = getString
        ? `${fetchingUrl}?${getString}`
        : createUrlWithQuery(fetchingUrl, requestData);
    }

    return fetchingUrl;
  }

  // tslint:disable-next-line:member-ordering
  public rest = this.createRestFetcher('/api');
}

export const ConnectionManager = new ConnectionManagerInstanse();
