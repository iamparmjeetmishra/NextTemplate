import axios from "axios";

import { MAIN_URL } from "./constants";

export const axiosInstance = axios.create({
  baseURL: MAIN_URL,
});

// object to store ongoing requests cancel tokens
const pendingRequests = new Map();

// next we set up the Request Interceptor, this logic triggers
// before each request that we send
axiosInstance.interceptors.request.use(
  (config) => {
    // generate an identifier for each request
    const requestIdentifier = `${config.url}_${config.method}`;

    // check if there is already a pending request with the same identifier
    if (pendingRequests.has(requestIdentifier)) {
      const cancelTokenSource = pendingRequests.get(requestIdentifier);
      // cancel the previous request
      cancelTokenSource.cancel("Cancelled due to new request");
    }

    // create a new CancelToken
    const newCancelTokenSource = axios.CancelToken.source();
    config.cancelToken = newCancelTokenSource.token;

    // store the new cancel token source in the map
    pendingRequests.set(requestIdentifier, newCancelTokenSource);
    return config;
  },
  (error) => {
    // return the error if the request fails
    return Promise.reject(error);
  }
);

// here we set up the Response Interceptor, this logic triggers
// before each response from the server comes
axiosInstance.interceptors.response.use(
  (response) => {
    // remove completed request from pending map
    const requestIdentifier = `${response.config.url}_${response.config.method}`;
    pendingRequests.delete(requestIdentifier);
    return response;
  },
  (error) => {
    // remove failed request from pending map
    if (error.config) {
      const requestIdentifier = `${error.config.url}_${error.config.method}`;
      pendingRequests.delete(requestIdentifier);
    }
    return Promise.reject(error);
  }
);
