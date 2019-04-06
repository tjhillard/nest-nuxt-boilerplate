import HttpService from '~/services/base/http-service';

class AuthApi extends HttpService {
  constructor() {
    super({
      baseURL: '/api/auth',
    });
  }
}

export default new AuthApi();
