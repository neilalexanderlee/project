import fetch from 'dva/fetch';
import { notification } from 'antd';
import qs from 'qs';

export function getUrl(url, params) {
  let urlWithParams = url;
  if (params) {
    if (url.search(/\?/) === -1) {
      urlWithParams = `${url}?${qs.stringify(params)}`;
    } else {
      urlWithParams = `${url}&${qs.stringify(params)}`;
    }
  }
  return urlWithParams;
}

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseErrorMessage({ status, message, result }) {
  if (status === 'error') {
    throw new Error(message);
  }
  return result;
}

function showError(err) {
  if (err.response) {
    notification.error({
      message: '网络连接错误',
      description: `错误代码:${err.response.status}, ${err.message}`,
    });
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(parseErrorMessage)
    .then(data => ({ data }))
    .catch((err) => {
      showError(err);
      return { err };
    });
}
