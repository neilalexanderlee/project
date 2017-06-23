import request, { getUrl } from '../utils/request';

export async function queryMenu(params) {
  return request(getUrl('/api/menu', params));
}

