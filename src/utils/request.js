import fetch from 'dva/fetch';
import { notification } from 'antd';
import router from 'umi/router';
import hash from 'hash.js';
import { isAntdPro } from './utils';

const codeMessage = {
  200: 'Máy chủ trả về dữ liệu yêu cầu thành công.',
  201: 'Thêm mới hoặc cập nhật dữ liệu thành công',
  202: 'Yêu cầu đã được gửi tới hàng đợi (tác vụ không đồng bộ)',
  204: 'Đã xóa dữ liệu thành công',
  400: 'Nội dung yêu cầu có lỗi và máy chủ không thực hiện bất kỳ hoạt động dữ liệu mới hoặc sửa đổi nào',
  401: 'Người dùng không có quyền truy cập (token, tài khoản, mật khẩu không đúng).',
  403: 'Người dùng được cấp quyền, nhưng không được phép truy cập.',
  404: 'Không tìm thấy dữ liệu, máy chủ không thực thi thao tác nào.',
  406: 'Định dạng nội dung yêu cầu không khả dụng.',
  410: 'Tài nguyên được yêu cầu sẽ bị xóa vĩnh viễn và sẽ không được truy lục.',
  422: 'Đã xảy ra lỗi xác thực khi tạo đối tượng.',
  500: 'Đã xảy ra lỗi trên máy chủ. Vui lòng kiểm tra máy chủ.',
  502: 'ateway error.',
  503: 'Dịch vụ không khả dụng và máy chủ tạm thời bị quá tải hoặc được duy trì.',
  504: 'The gateway timed out.',
};

const checkStatus = response => {
  // Return the response incase HTTP is ok
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `Request error ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

const cachedSave = (response, hashcode) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(
  url,
  options = {
    expirys: isAntdPro(),
  }
) {
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
  const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest('hex');

  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  // Force to check for token saved in localStorage
  // if (!localStorage.getItem('token')) {
  //   // @HACK
  //   /* eslint-disable no-underscore-dangle */
  //   window.g_app._store.dispatch({
  //     type: 'login/logout',
  //   });
  //   return;
  // }

  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  const expirys = options.expirys || 60;
  // options.expirys !== false, return the cache,
  if (options.expirys !== false) {
    const cached = sessionStorage.getItem(hashcode);
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000;
      if (age < expirys) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      sessionStorage.removeItem(hashcode);
      sessionStorage.removeItem(`${hashcode}:timestamp`);
    }
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => cachedSave(response, hashcode))
    .then(response => {
      // DELETE and 204 do not return data by default
      // using .json will report an error.
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      return response.json();
    })
    .catch(e => {
      const status = e.name;
      if (status === 401) {
        // @HACK
        /* eslint-disable no-underscore-dangle */
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
        return;
      }
      // environment should not be used
      if (status === 403) {
        router.push('/exception/403');
        return;
      }
      if (status <= 504 && status >= 500) {
        router.push('/exception/500');
        return;
      }
      if (status >= 404 && status < 422) {
        router.push('/exception/404');
      }
    });
}
