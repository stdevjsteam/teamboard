import { normalize, Schema } from 'normalizr';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { Store } from 'redux';
import { auth } from '../modules';
import { common } from '../modules';

interface Config {
  endpoint: string;
  method?: string;
  body?: object;
  schema?: Schema;
  callbacks: Callbacks;
  apiRoot: string;
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = async (config: Config, store: Store) => {
  const { callbacks, apiRoot, endpoint, schema, body, method = 'GET' } = config;
  const stringBody = body && JSON.stringify(decamelizeKeys(body));
  const fullUrl = apiRoot + endpoint;

  //  makes a request
  const send = async () => {
    const headers = new Headers({
      'content-type': 'application/json',
      Authorization: callbacks.getTokens().accessToken
    });

    const request = new Request(fullUrl, {
      body: stringBody,
      method,
      headers
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw response;
    }

    const json = await response.json().catch(() => ({}));
    const camelizedJson = camelizeKeys(json);

    return schema ? normalize(camelizedJson, schema) : camelizedJson;
  };

  try {
    return await send();
  } catch (errResponse) {
    // the case when the error is NOT related to authentication
    if (errResponse.status !== 401) {
      throw camelizeKeys(await errResponse.json());
    }

    const { refreshToken } = callbacks.getTokens();
    const { response } = await store.dispatch(auth.refreshToken({
      refreshToken
    }) as any);

    if (response) {
      callbacks.setTokens({ accessToken: response.accessToken, refreshToken });

      return send();
    } else {
      callbacks.removeTokens();
      callbacks.redirect(store);
      return undefined;
    }
  }
};

interface Params {
  callbacks: Callbacks;
  apiRoot: string;
}

interface Callbacks {
  onSuccess?(response: any): void;
  onFailure?(error: any): void;
  getTokens(): Tokens;
  setTokens(tokens: Tokens): void;
  removeTokens(): void;
  redirect(store: Store): void;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default ({ callbacks, apiRoot }: Params) => (store: Store) => (
  next: (action: any) => void
) => (action: common.ApiAction) => {
  const callAPI = action[common.CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { schema, types, method, body, endpoint } = callAPI;
  const { getTokens, setTokens, removeTokens, redirect } = callbacks;

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Expected endpoint to be a string');
  }

  if (typeof getTokens !== 'function') {
    throw new Error('Expected getTokens to be a function');
  }

  if (typeof setTokens !== 'function') {
    throw new Error('Expected setTokens to be a function');
  }

  if (typeof removeTokens !== 'function') {
    throw new Error('Expected removeTokens to be a function');
  }

  if (typeof redirect !== 'function') {
    throw new Error('Expected redirect to be a function');
  }

  const actionWith = (data: any) => {
    const finalAction = { ...action, ...data };
    delete finalAction[common.CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  const requestAction = actionWith({ type: requestType });
  next(requestAction);

  const config = { endpoint, schema, method, body, callbacks, apiRoot };

  return callApi(config, store).then(
    response => {
      const { onSuccess } = callbacks;
      onSuccess && onSuccess(response);

      return next(
        actionWith({
          response,
          type: successType,
          requestAction
        })
      );
    },
    error => {
      const { onFailure } = callbacks;
      onFailure && onFailure(error);

      return next(
        actionWith({
          type: failureType,
          error: error.message || 'Something bad happened',
          requestAction
        })
      );
    }
  );
};
