import * as axios from 'axios/dist/axios';

class HttpService {
  constructor(baseAxiosConfig = {}) {
    this.baseConfig = baseAxiosConfig;
    this.baseConfig.headers = {};
  }

  async get(path, config) {
    const res = await axios.get(
      this._buildFullRequestPath(path),
      this._buildConfig(config)
    );
    return res.data;
  }

  async post(path, config) {
    const res = await axios.post(
      this._buildFullRequestPath(path),
      this._buildConfig(config)
    );
    return res.data;
  }

  async put(path, config) {
    const res = await axios.put(
      this._buildFullRequestPath(path),
      this._buildConfig(config)
    );
    return res.data;
  }

  async delete(path, config) {
    const res = await axios.delete(
      this._buildFullRequestPath(path),
      this._buildConfig(config)
    );
    return res.data;
  }

  _buildConfig(config) {
    const merged = {
      ...this.baseConfig,
      ...config,
    };

    delete merged.baseURL;
    if (localStorage.getItem('auth._token.local')) {
      merged.headers.Authorization = localStorage.getItem('auth._token.local');
    }

    return merged;
  }

  _buildFullRequestPath(routePath) {
    const path = `/${this.baseConfig.baseURL || '/'}/${routePath}`;
    return path.replace('//', '/');
  }
}

export default HttpService;
