import axios from 'axios';
const API_ROOT = import.meta.env.VITE_API_ROOT;
export default class BaseApi {
  constructor(url) {
    this.url = url;
  }

  getAll(data = {}) {
    return this.get(this.url, { params: data });
  }

  getOne(id) {
    return this.get(`${this.url}/${id}`);
  }

  create(data) {
    return this.post(this.url, data);
  }

  update(id, data) {
    return this.put(id, data);
  }

  delete(id) {
    return this.del(id);
  }

  async get_with(url, params = {}, token = null) {
    try {
      const headers = this.getHeaders(token);
      const response = await axios.get(`${url}`, { params, headers: headers });
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async get(url, params = {}, token = null) {
    try {
      const headers = this.getHeaders(token);
      const response = await axios.get(`${API_ROOT}/${url}`, {
        params,
        headers: headers
      });
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async put(url, data, token = null) {
    try {
      const headers = this.getHeaders(token);
      const response = await axios.put(`${API_ROOT}/${url}`, data, {
        headers: headers
      });
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async post(url, data, token = null, config = {}) {
    try {
      const headers = this.getHeaders(token, config);
      const response = await axios.post(`${API_ROOT}/${url}`, data, {
        headers: headers
      });
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async postDataForm(url, data, token = null, config = {}) {
    try {
      const headers = this.getHeadersDataForm(token, config);
      console.log(headers);
      const response = await axios.post(`${API_ROOT}/${url}`, data, {
        headers: headers
      });
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }


  async del(url, data = null, token = null,config = {}) {
    try {
      const headers = this.getHeaders(token, config);
      const response = await axios.delete(`${API_ROOT}/${url}`,{
        headers: headers
      });
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  _responseHandler(response) {
    const data = response.data;
    return data;
  }

  _errorHandler(error) {
    if (error.response && error.response.status === 404) {
      window.$nuxt.$router.push({
        name: 'home'
      });
    } else if (error.response && error.response.status === 401) {
      window.$nuxt.$router.push({
        name: 'signin'
      });
    } else throw error;
  }

  getHeaders(token = null, config = {}) {
    let headers = {
      "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
                    'Content-Type': 'application/json;charset=UTF-8/multipart/form-data',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if(config) {
      headers = { ...headers, ...config };
    }

    return headers;
  }

  getHeadersDataForm(token = null, config = {}) {
    let headers = {
      "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
                    'Content-Type': 'multipart/form-data',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if(config) {
      headers = { ...headers, ...config };
    }

    return headers;
  }
}
