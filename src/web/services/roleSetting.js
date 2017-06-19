import request, { getUrl } from '../utils/request';

export async function queryRole() {
  return request('/api/role');
}

export async function queryRoleResources(params) {
  return request(getUrl('/api/roleResources', params));
}

export async function updateRole(params) {
  return request('/api/updateRole', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    // headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
    body: JSON.stringify(params),
    // body: 'key1=value1&key2=value2'
  });
}
